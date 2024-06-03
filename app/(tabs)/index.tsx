import ExploreHeader from '@/components/ExploreHeader'
import Listings from '@/components/Listings'
import { Stack } from 'expo-router'
import { View } from 'react-native'
import { useMemo, useState } from 'react'
import ListingsData from "@/assets/data/airbnb-listings.json"
import ListingsMap from '@/components/ListingsMap'
import ListingsGeoData from '@/assets/data/airbnb-listings.geo.json'
import { GeoListing } from '@/interfaces/GeoListing'
import ListingsBottomSheet from '@/components/ListingsBottomSheet'

const Index = () => {
  const items = useMemo(() => ListingsData as any, [])
  const geoItems = useMemo(() => ListingsGeoData as any, [])
  const [category, setCategory] = useState("Tiny homes")
    const onDataChanged = (category: string) => {
      setCategory(category)
    }
    return (
      <View style={{flex: 1, marginTop: 130}}>
          <Stack.Screen options={{
            header: () => <ExploreHeader onCategoryChanged={onDataChanged}/>
          }}></Stack.Screen>
          <ListingsMap listings={geoItems} />
          <ListingsBottomSheet listings={items} category={category} />
      </View>
    )
}

export default Index