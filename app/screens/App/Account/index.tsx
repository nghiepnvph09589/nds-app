import R from '@app/assets/R'
import { SCREEN_ROUTER } from '@app/constant/Constant'
import { navigateSwitch } from '@app/navigation/switchNavigatorSlice'
import AsyncStorageService from '@app/service/AsyncStorage/AsyncStorageService'
import { useAppSelector } from '@app/store'
import { showConfirm } from '@app/utils/AlertHelper'
import { hideLoading, showLoading } from '@app/utils/LoadingProgressRef'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { clearNotifyCount } from '../Notification/slice'
import { requestLogout } from './api/AccountApi'
import UserDirectory from './components/UserDirectory'
import UserInfo from './components/UserInfo'
import { logout } from './slices/AccountSlice'

const Account = () => {
  const { data, isLoading } = useAppSelector(state => state.accountReducer)
  const dispatch = useDispatch()
  const handleLogout = async () => {
    await requestLogout({})
    dispatch(logout())
    dispatch(clearNotifyCount())
    await AsyncStorageService.putToken('')
    dispatch(navigateSwitch(SCREEN_ROUTER.AUTH))
  }
  if (isLoading) {
    showLoading()
  } else {
    hideLoading()
  }
  return (
    <View style={styles.v_container}>
      <UserInfo
        name={data?.name}
        avatar={
          data?.profile_picture_path
            ? data?.profile_picture_url.replace('http://', 'https://')
            : ''
        }
      />
      <UserDirectory
        logout={() => {
          showConfirm(
            R.strings().notification,
            'Bạn có chắc chắn muốn đăng xuất',
            () => {
              handleLogout()
            }
          )
        }}
      />
      {/* {messagesStatus && (
        <Messages
          hide={() => {
            setMessagesStatus(false)
          }}
          onAccept={() => {
            handleLogout()
            setMessagesStatus(false)
          }}
          onCancel={() => {
            setMessagesStatus(false)
          }}
          description={'Bạn có chắc chắn muốn đăng xuất không'}
        />
      )} */}
    </View>
  )
}

const styles = StyleSheet.create({
  v_container: {
    flex: 1,
  },
})

export default Account
