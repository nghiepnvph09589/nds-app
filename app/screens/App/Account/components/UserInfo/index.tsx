import { ImageBackground, Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import R from '@app/assets/R'
import { getStatusBarHeight, isIphoneX } from 'react-native-iphone-x-helper'
import FstImage from '@app/components/FstImage'
import { fonts } from '@app/theme'

const UserInfo = () => {
  return (
    <ImageBackground
      style={styles.v_image}
      source={R.images.img_background_header}
    >
      <View style={styles.v_content}>
        <FstImage style={styles.avatar} source={R.images.img_avatar2} />
        <Text style={styles.txt_name}>Tree Poo</Text>
      </View>
    </ImageBackground>
  )
}

export default UserInfo

const styles = StyleSheet.create({
  v_image: {
    width: '100%',
    aspectRatio: 2.5,
  },
  v_content: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:
      Platform.OS === 'ios'
        ? getStatusBarHeight() + 15
        : isIphoneX()
        ? getStatusBarHeight() + 15
        : 20,
    paddingLeft: 30,
  },
  avatar: {
    width: 50,
    height: 50,
  },
  txt_name: {
    ...fonts.semi_bold16,
    color: 'white',
    marginLeft: 16,
  },
})
