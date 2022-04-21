import { APP_SLICE, SCREEN_ROUTER } from '@app/constant/Constant'
import React, { useEffect } from 'react'

import AsyncStorage from '@react-native-community/async-storage'
import FastImage from 'react-native-fast-image'
import R from '@app/assets/R'
import { StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { navigateSwitch } from '@app/navigation/switchNavigatorSlice'
import splashScreen from 'react-native-splash-screen'

const SplashScreen = (props: any) => {
  useEffect(() => {
    splashScreen.hide()
    checkFirstly()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const checkFirstly = async () => {
    const firstly = await AsyncStorage.getItem('firstly')
    if (firstly) {
      props.navigateSwitch(SCREEN_ROUTER.MAIN)
    } else {
      props.navigateSwitch(SCREEN_ROUTER.INTRODUCE)
    }
  }

  return <FastImage source={R.images.img_splash} style={styles.image} />
}

const mapStateToProps = (state: any) => ({
  switch: state[APP_SLICE.SWITCH].switch,
})

const mapDispatchToProps = {
  navigateSwitch,
}
const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen)
