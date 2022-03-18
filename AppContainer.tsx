import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import AppNavigator from './app/navigation/AppNavigator'
import MapboxGL from '@react-native-mapbox-gl/maps'
import { MAP_BOX_TOKEN } from '@app/config'

MapboxGL.setAccessToken(MAP_BOX_TOKEN)

const AppContainer = () => {
  return (
    <SafeAreaProvider>
      <AppNavigator />
    </SafeAreaProvider>
  )
}

export default AppContainer
