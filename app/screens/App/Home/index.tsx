import AsyncStorageService from '@app/service/AsyncStorage/AsyncStorageService'
import { useAppSelector } from '@app/store'
import { colors } from '@app/theme'
import React, { useEffect } from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { getDataUserInfo } from '../Account/slices/AccountSlice'
import Header from './components/Header'
import ListPost from './components/ListPost'
import { DataPost } from './mockup'

const Home = () => {
  const dispatch = useDispatch()
  const userInfo = useAppSelector(state => state.accountReducer.data)
  useEffect(() => {
    getDataUser()
  }, [])

  const getDataUser = async () => {
    const token = await AsyncStorageService.getToken()
    if (token) {
      dispatch(getDataUserInfo())
    }
  }

  return (
    <View style={styles.v_container}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <Header
        avatar={userInfo.profile_picture_url.replace('http://', 'https://')}
        name={userInfo.name}
      />
      <ListPost data={DataPost} />
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
