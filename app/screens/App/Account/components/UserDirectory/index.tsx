import { Platform, RefreshControl, ScrollView, StyleSheet } from 'react-native'
import { ROLE, SCREEN_ROUTER_APP } from '@app/constant/Constant'
import { getStatusBarHeight, isIphoneX } from 'react-native-iphone-x-helper'

import Directory from './components/Directory'
import NavigationUtil from '@app/navigation/NavigationUtil'
import R from '@app/assets/R'
import React from 'react'
import { getDataUserInfo } from '../../slices/AccountSlice'
import { useAppSelector } from '@app/store'
import { useDispatch } from 'react-redux'

const UserDirectory = ({ logout }: { logout: () => void }) => {
  const { data } = useAppSelector(state => state.accountReducer)
  const dispatch = useDispatch()

  const onRefresh = () => {
    dispatch(getDataUserInfo())
  }
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={onRefresh} />
      }
      style={styles.v_container}
    >
      {data?.role !== ROLE.CUSTOMER && data?.role !== ROLE.OFFICER_WARD && (
        <Directory
          onPress1={() => {
            NavigationUtil.navigate(SCREEN_ROUTER_APP.MANAGE_LIST_POST)
          }}
          onPress2={() => {
            NavigationUtil.navigate(SCREEN_ROUTER_APP.MANAGE_LIST_SUPPORT)
          }}
          label1={R.strings().manage_list_post}
          source1={R.images.ic_manage_list_post}
          label2={R.strings().manage_list_support}
          source2={R.images.ic_manage_list_support}
          countPost={data?.post}
          countDonate={data?.donate}
        />
      )}

      <Directory
        onPress1={() => {
          NavigationUtil.navigate(SCREEN_ROUTER_APP.UPDATE_ACCOUNT)
        }}
        onPress2={() => {
          NavigationUtil.navigate(SCREEN_ROUTER_APP.LIST_SUPPORT)
        }}
        label1={R.strings().edit_user_info}
        source1={R.images.ic_edit_user}
        label2={'Danh sách đã ủng hộ'}
        source2={R.images.ic_list2}
        label3={'Tin đăng của tôi'}
        source3={R.images.ic_list_post}
        onPress3={() => {
          ;``
          NavigationUtil.navigate(SCREEN_ROUTER_APP.LIST_POST)
        }}
      />
      <Directory
        onPress1={() => {
          NavigationUtil.navigate(SCREEN_ROUTER_APP.CONTACT)
        }}
        onPress2={() => {
          NavigationUtil.navigate(SCREEN_ROUTER_APP.TERMS)
        }}
        label1={R.strings().contact}
        source1={R.images.ic_contact}
        label2={R.strings().terms}
        source2={R.images.ic_terms}
      />
      <Directory
        onPress1={() => {
          NavigationUtil.navigate(SCREEN_ROUTER_APP.CHANGE_PASS)
        }}
        onPress2={logout}
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
