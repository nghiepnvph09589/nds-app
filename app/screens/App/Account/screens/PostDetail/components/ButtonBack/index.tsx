import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import NavigationUtil from '@app/navigation/NavigationUtil'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import FstImage from '@app/components/FstImage'
import R from '@app/assets/R'

const ButtonBack = () => {
  return (
    <TouchableOpacity
      onPress={() => {
        NavigationUtil.goBack()
      }}
      style={styles.v_back}
    >
      <FstImage style={styles.icon} source={R.images.ic_back2} />
    </TouchableOpacity>
  )
}

export default ButtonBack

const styles = StyleSheet.create({
  v_back: {
    position: 'absolute',
    left: 15,
    top: getStatusBarHeight() + 15,
  },
  icon: {
    width: 32,
    height: 32,
  },
})
