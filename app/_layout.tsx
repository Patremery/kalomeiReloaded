import { Ionicons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useAuth, ClerkProvider } from '@clerk/clerk-expo'
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const CLERK_PUBLISHABLE_KEY= process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

const tokenCache = {
  async getToken(key: string) {
      try {
        return SecureStore.getItemAsync(key)
      } catch (error) {
        console.log(error)
        return null
      }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value)
    } catch (error) {
      console.log(error)
      return null
    }
}

}

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'mon': require("../assets/fonts/Montserrat-Regular.ttf"),
    'mon-sb': require("../assets/fonts/Montserrat-SemiBold.ttf"),
    'mon-b': require("../assets/fonts/Montserrat-Bold.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY!} tokenCache={tokenCache}>
        <RootLayoutNav />
      </ClerkProvider>
    </GestureHandlerRootView>
  )
   ;
}

function RootLayoutNav() {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();
  useEffect(() => {
    if(isLoaded && !isSignedIn) {
      router.push("/(modals)/login")
    }
  }, [isLoaded])
  
  return (
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen 
          name="(modals)/login"
          options={{ 
            title: "Login or Sign Up",
            presentation: "modal",
            headerTitleStyle: {
              fontFamily: "mon-sb",
              fontSize: 16,
            },
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                  <Ionicons name="close-outline" size={28}/>
              </TouchableOpacity>
            )

          }}
        />
        <Stack.Screen
          name="(modals)/booking"
          options={{
            title: "Book a Property",
            presentation: "transparentModal",
            animation: "fade",
            headerTitleStyle: {
              fontFamily: "mon-sb",
              fontSize: 16,
            },
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="close-outline" size={28}/>
              </TouchableOpacity>
            )
          }}
         />
         <Stack.Screen name="listing/[id]" options={{ headerTitle: ''}} />
      </Stack>
  );
}
