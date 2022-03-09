import React from 'react'
import { StyleSheet, View } from 'react-native'
import UserDirectory from './components/UserDirectory'
import UserInfo from './components/UserInfo'

const Account = () => {
  return (
    <View style={styles.v_container}>
      <UserInfo />
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
