import R from '@app/assets/R'
import { SCREEN_ROUTER } from '@app/constant/Constant'
import { navigateSwitch } from '@app/navigation/switchNavigatorSlice'
import AsyncStorageService from '@app/service/AsyncStorage/AsyncStorageService'
import React from 'react'
import { Platform, ScrollView, StyleSheet } from 'react-native'
import { getStatusBarHeight, isIphoneX } from 'react-native-iphone-x-helper'
import { useDispatch } from 'react-redux'
import { logout } from '../../slices/AccountSlice'
import Directory from './components/Directory'

const UserDirectory = () => {
  const dispatch = useDispatch()

  const handleLogout = async () => {
    await AsyncStorageService.putToken('')
    dispatch(logout())
    dispatch(navigateSwitch(SCREEN_ROUTER.AUTH))
  }
  return (
    <ScrollView style={styles.v_container}>
      <Directory
        onPress1={() => {}}
        onPress2={() => {}}
        label1={R.strings().edit_user_info}
        source1={R.images.ic_edit_user}
        label2={R.strings().support_list}
        source2={R.images.ic_list2}
      />
      <Directory
        onPress1={() => {}}
        onPress2={() => {}}
        label1={R.strings().contact}
        source1={R.images.ic_contact}
        label2={R.strings().terms}
        source2={R.images.ic_terms}
      />
      <Directory
        onPress1={() => {}}
        onPress2={handleLogout}
        label1={R.strings().change_password}
        source1={R.images.ic_change_pass}
        label2={R.strings().logout}
        source2={R.images.ic_logout}
        style={styles.v_margin_bottom}
      />
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  v_container: {
    flex: 1,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    marginTop:
      Platform.OS === 'ios' && isIphoneX()
        ? -25
        : Platform.OS === 'ios' && !isIphoneX()
        ? -35
        : Platform.OS !== 'ios' && isIphoneX()
        ? -30
        : -30 - getStatusBarHeight(),
    backgroundColor: '#FAFAFA',
    paddingTop: 24,
    paddingHorizontal: 12,
  },
  v_margin_bottom: {
    marginBottom: 100,
  },
})

export default UserDirectory
