import ScreenWrapper from '@app/components/Screen/ScreenWrapper'
import { colors } from '@app/theme'
import React from 'react'
import { StyleSheet } from 'react-native'

const ManageListPost = () => {
  return (
    <ScreenWrapper
      back
      color={colors.text}
      backgroundHeader="white"
      forceInset={['left']}
      titleHeader={'Quản lý tin đăng'}
      children={<></>}
    />
  )
}

export default ManageListPost

const styles = StyleSheet.create({})
