import { useAppSelector } from '@app/store'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import UserDirectory from './components/UserDirectory'
import UserInfo from './components/UserInfo'

const Account = () => {
  const userInfo = useAppSelector(state => state.accountReducer.data)
  return (
    <View style={styles.v_container}>
      <UserInfo
        name={userInfo?.name}
        avatar={userInfo?.profile_picture_url.replace('http://', 'https://')}
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
