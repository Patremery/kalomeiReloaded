import { defaultStyles } from '@/constants/Styles';
import { GeoListing } from '@/interfaces/GeoListing';
import { useRouter } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native'
import { Marker } from 'react-native-maps'
import MapView from 'react-native-map-clustering';

interface Props {
    listings: GeoListing;
}

const INITIAL_REGION = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
}
const router = useRouter();

const ListingsMap = ({listings} : Props) => {
  
  const onMarkerSelected = (id:  number) => {
    router.push(`/listing/${id}`)
  };
  
  const displayMarker = (item: any) => {
      return (
          <Marker 
              key={item.properties.id}
              coordinate={{
                  latitude: parseFloat(item.properties.latitude), 
                  longitude: parseFloat(item.properties.longitude)
              }}
              onPress={() => onMarkerSelected(item.properties.id)}
          >
            <View style={styles.marker}>
              
              <Text style={styles.markerText}>€ {item.properties.price} </Text>
            </View>
          </Marker>
      )  
  } 

  const renderCluster = (cluster: any) => {
    const {id, geometry, onPress, properties} = cluster
    const points = properties.point_count

    return (
      <Marker 
      key={`cluster-${id}`}
      onPress={onPress}
      coordinate={{
        longitude: geometry.coordinates[0],
        latitude: geometry.coordinates[1],
      }}
      >
        <View style={styles.marker}>
          <Text style={{color: "#000", textAlign: 'center', fontFamily: 'mon-sb'}}>{points} </Text>
        </View>
      </Marker>
    )
  }

  return (
    <View style={defaultStyles.container}>
      <MapView
        //mapType='satellite'
        animationEnabled={false}
        style={StyleSheet.absoluteFill}
        //provider={PROVIDER_GOOGLE} 
        showsBuildings
        showsUserLocation 
        showsMyLocationButton 
        initialRegion={INITIAL_REGION}
        clusterColor="#fff"
        clusterTextColor='#000'
        renderCluster={renderCluster}
        clusterFontFamily='mon-sb'
      >
        {
            listings.features.map((item: any) => displayMarker(item))
        }
      </MapView>
      
    </View>
  )
}

export default ListingsMap

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    marker: {
      padding: 8,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
      elevation: 5,
      borderRadius: 12,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 6,
      shadowOffset: {
        width: 1,
        height: 10,
      },
    },
    markerText: {
      fontSize: 14,
      fontFamily: 'mon-sb',
    },
    locateBtn: {
      position: 'absolute',
      top: 70,
      right: 20,
      backgroundColor: '#fff',
      padding: 10,
      borderRadius: 10,
      elevation: 2,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 6,
      shadowOffset: {
        width: 1,
        height: 10,
      },
    },
  });