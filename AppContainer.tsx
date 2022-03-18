import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import AppNavigator from './app/navigation/AppNavigator'
import Geolocation from 'react-native-geolocation-service'
const AppContainer = () => {
  return (
    <SafeAreaProvider>
      <AppNavigator />
    </SafeAreaProvider>
  )
}

export default AppContainer
