import { Text, View, Button } from 'react-native'
import { useAuth } from '@clerk/clerk-expo'
import { Link } from 'expo-router'

const Profile = () => {
  const { signOut, isSignedIn } = useAuth();
    return (
      <View>
        <Button title='Log Out' onPress={() => signOut()}/>
        {
        !isSignedIn && (
            <Link href={"/(modals)/login"}>
               <Text>Log In</Text>
            </Link>
        )};
      </View>
    );
     
}

export default Profile