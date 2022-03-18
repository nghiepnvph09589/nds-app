import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '@app/components/Screen/ScreenWrapper'
import { colors } from '@app/theme'
import R from '@app/assets/R'

const AddressMap = () => {
  return (
    <ScreenWrapper
      back
      color={colors.text}
      backgroundHeader="white"
      forceInset={['left']}
      titleHeader={R.strings().address}
      children={<></>}
    />
  )
}

export default AddressMap

const styles = StyleSheet.create({})
