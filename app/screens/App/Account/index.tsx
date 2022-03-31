import { StyleSheet, View } from 'react-native'
import { hideLoading, showLoading } from '@app/utils/LoadingProgressRef'

import React from 'react'
import UserDirectory from './components/UserDirectory'
import UserInfo from './components/UserInfo'
import { useAppSelector } from '@app/store'

const Account = () => {
  const { data, isLoading } = useAppSelector(state => state.accountReducer)
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
      <UserDirectory />
    </View>
  )
}

const styles = StyleSheet.create({
  v_container: {
    flex: 1,
  },
})

export default Account
