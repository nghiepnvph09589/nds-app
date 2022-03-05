import ScreenWrapper from '@app/components/Screen/ScreenWrapper'
import React, { useEffect } from 'react'
import { View } from 'react-native'
const HomeScreen = () => {
  useEffect(() => {
    return () => {}
  }, [])

  return (
    <ScreenWrapper
      backgroundColor="#F5F5F5"
      children={<View style={{ backgroundColor: 'red', flex: 1 }}></View>}
    />
  )
}

export default HomeScreen
