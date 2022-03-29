import AsyncStorageService from '@app/service/AsyncStorage/AsyncStorageService'
import { useAppSelector } from '@app/store'
import { colors } from '@app/theme'
import { hideLoading, showLoading } from '@app/utils/LoadingProgressRef'
import React, { useEffect } from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { getDataUserInfo } from '../Account/slices/AccountSlice'
import Header from './components/Header'
import ListPost from './components/ListPost'
import { getDataHome } from './slice/HomeSlice'
import Geolocation from 'react-native-geolocation-service'
import { updateLocation } from '@app/screens/LocationSlice'
import { PERMISSION_TYPE, Permission } from '@app/utils/AppPermission'
import Error from '@app/components/Error/Error'
const Home = () => {
  const dispatch = useDispatch()
  const { isLoading, data, isError } = useAppSelector(
    state => state.homeReducer
  )
  const userInfo = useAppSelector(state => state.accountReducer.data)
  useEffect(() => {
    getDataUser()
    getHome()
    setTimeout(() => {
      requestPermission()
    }, 4000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

  const getHome = async () => {
    dispatch(getDataHome({ page: 1 }))
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

  if (isLoading) {
    showLoading()
  } else {
    hideLoading()
  }
  if (isError)
    return (
      <Error
        reload={() => {
          getHome()
          getDataUser()
        }}
      />
    )

  return (
    <View style={styles.v_container}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <Header
        avatar={
          userInfo?.profile_picture_url
            ? userInfo?.profile_picture_url.replace('http://', 'https://')
            : ''
        }
        name={userInfo?.name}
      />
      <ListPost data={data.listPost} />
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
