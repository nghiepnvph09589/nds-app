import { ImageBackground, Platform, StyleSheet, Text, View } from 'react-native'
import { getStatusBarHeight, isIphoneX } from 'react-native-iphone-x-helper'

import FstImage from '@app/components/FstImage'
import R from '@app/assets/R'
import React from 'react'
import { fonts } from '@app/theme'

interface UserInfoProps {
  avatar: string
  name: string
}

const UserInfo = (props: UserInfoProps) => {
  const { avatar, name } = props
  return (
    <ImageBackground
      style={styles.v_image}
      source={R.images.img_background_header}
    >
      <View style={styles.v_content}>
        <FstImage
          resizeMode="cover"
          style={styles.avatar}
          source={!!avatar ? { uri: avatar } : R.images.ic_avatar_default}
        />

        <Text style={styles.txt_name}>
          {!!name ? name : R.strings().not_update}
        </Text>
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
    borderRadius: 50 / 2,
  },
  txt_name: {
    ...fonts.semi_bold16,
    color: 'white',
    marginLeft: 16,
  },
})
