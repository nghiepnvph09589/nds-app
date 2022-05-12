import { PERMISSION_TYPE, Permission } from '@app/utils/AppPermission'
import React, { useEffect } from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'
import { API_STATUS } from '@app/constant/Constant'
import AsyncStorageService from '@app/service/AsyncStorage/AsyncStorageService'
import Geolocation from 'react-native-geolocation-service'
import Header from './components/Header'
import ListPost from './components/ListPost'
import { colors } from '@app/theme'
import { getDataUserInfo } from '../Account/slices/AccountSlice'
import { requestCountNotification } from '../Notification/api'
import { setCountNotify } from '../Notification/slice'
import { updateLocation } from '@app/screens/LocationSlice'
import { useAppSelector } from '@app/store'
import { useDispatch } from 'react-redux'

const Home = () => {
  const dispatch = useDispatch()

  const userInfo = useAppSelector(state => state.accountReducer.data)
  useEffect(() => {
    getDataUser()
    getCountNotifyNotRead()
    setTimeout(() => {
      requestPermission()
    }, 4000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const getCountNotifyNotRead = async () => {
    const token = await AsyncStorageService.getToken()
    if (token) {
      const res = await requestCountNotification()
      if (res?.code === API_STATUS.SUCCESS) {
        await dispatch(setCountNotify(res?.data?.notification_not_seen))
      }
    }
  }

  const requestPermission = async () => {
    const token = await AsyncStorageService.getToken()
    if (token) {
      await Permission.requestMultiple([
        PERMISSION_TYPE.fine_location,
        PERMISSION_TYPE.coarse_location,
      ])
      getLocation()
    }
  }

  const getDataUser = async () => {
    const token = await AsyncStorageService.getToken()
    if (token) {
      dispatch(getDataUserInfo())
    }
  }

  const getLocation = async () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log('current location', position)
        dispatch(
          updateLocation({
            lat: position.coords.latitude,
            long: position.coords.longitude,
          })
        )
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message)
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      }
    )
  }

  return (
    <View style={styles.v_container}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <Header
        avatar={
          userInfo?.profile_picture_path
            ? userInfo?.profile_picture_url.replace('http://', 'https://')
            : ''
        }
        name={userInfo?.name}
      />
      <ListPost />
    </View>
  )
}
const styles = StyleSheet.create({
  v_container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
})

export default Home
