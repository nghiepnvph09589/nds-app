import React, { useEffect } from 'react'

import AppNavigator from './app/navigation/AppNavigator'
import { MAP_BOX_TOKEN } from '@app/config'
import MapboxGL from '@react-native-mapbox-gl/maps'
import OneSignalUtil from '@app/utils/OnesignalUtils'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useAppDispatch } from '@app/store'

MapboxGL.setAccessToken(MAP_BOX_TOKEN)

const AppContainer = () => {
  const Dispatch = useAppDispatch()
  useEffect(() => {
    OneSignalUtil.initialize(Dispatch)
  }, [Dispatch])
  return (
    <SafeAreaProvider>
      <AppNavigator />
    </SafeAreaProvider>
  )
}

export default AppContainer
