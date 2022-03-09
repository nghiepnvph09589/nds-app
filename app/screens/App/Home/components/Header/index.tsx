import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors, fonts } from '@app/theme'
import { getStatusBarHeight, isIphoneX } from 'react-native-iphone-x-helper'
import FstImage from '@app/components/FstImage'
import R from '@app/assets/R'

const Header = () => {
  return (
    <View style={styles.v_container}>
      <View style={styles.v_header}>
        <View style={styles.v_row}>
          <FstImage
            resizeMode="contain"
            style={styles.icon}
            source={R.images.img_avatar2}
          />
          <Text style={styles.txt_name}>Tree Poo</Text>
          <TouchableOpacity>
            <FstImage style={styles.icon} source={R.images.ic_support} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  v_container: {
    backgroundColor: 'white',
  },
  v_header: {
    backgroundColor: colors.primary,
    paddingTop: isIphoneX() ? getStatusBarHeight() + 20 : 16,
    paddingHorizontal: 15,
    paddingBottom: 25,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  v_row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 36,
    height: 36,
  },
  txt_name: {
    ...fonts.semi_bold16,
    color: 'white',
    marginLeft: 16,
    flex: 1,
  },
})
