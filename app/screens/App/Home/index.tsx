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

const Home = () => {
  const dispatch = useDispatch()
  const { isLoading, data } = useAppSelector(state => state.homeReducer)
  const userInfo = useAppSelector(state => state.accountReducer.data)
  useEffect(() => {
    getDataUser()
    getHome()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getDataUser = async () => {
    const token = await AsyncStorageService.getToken()
    if (token) {
      dispatch(getDataUserInfo())
    }
  }

  const getHome = async () => {
    dispatch(getDataHome({ page: 1 }))
  }
  if (isLoading) {
    showLoading()
  } else {
    hideLoading()
  }

  return (
    <View style={styles.v_container}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <Header
        avatar={userInfo.profile_picture_url.replace('http://', 'https://')}
        name={userInfo.name}
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
