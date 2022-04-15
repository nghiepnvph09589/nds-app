import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { hideLoading, showLoading } from '@app/utils/LoadingProgressRef'

import AsyncStorageService from '@app/service/AsyncStorage/AsyncStorageService'
import Messages from '@app/components/Messages'
import { SCREEN_ROUTER } from '@app/constant/Constant'
import UserDirectory from './components/UserDirectory'
import UserInfo from './components/UserInfo'
import { logout } from './slices/AccountSlice'
import { navigateSwitch } from '@app/navigation/switchNavigatorSlice'
import { requestLogout } from './api/AccountApi'
import { useAppSelector } from '@app/store'
import { useDispatch } from 'react-redux'

const Account = () => {
  const { data, isLoading } = useAppSelector(state => state.accountReducer)
  const [messagesStatus, setMessagesStatus] = useState<boolean>(false)
  const dispatch = useDispatch()
  const handleLogout = async () => {
    await requestLogout({})
    dispatch(logout())
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
          setMessagesStatus(true)
        }}
      />
      {messagesStatus && (
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
          description={'Bạn có chắc chán muốn đăng xuất không'}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  v_container: {
    flex: 1,
  },
})

export default Account
