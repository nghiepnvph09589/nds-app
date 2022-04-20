import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { SCREEN_ROUTER, SCREEN_ROUTER_APP } from '@app/constant/Constant'
import { colors, fonts } from '@app/theme'
import { getStatusBarHeight, isIphoneX } from 'react-native-iphone-x-helper'

import FstImage from '@app/components/FstImage'
import NavigationUtil from '@app/navigation/NavigationUtil'
import R from '@app/assets/R'
import React from 'react'
import { navigateSwitch } from '@app/navigation/switchNavigatorSlice'
import { useDispatch } from 'react-redux'

interface HeaderProps {
  avatar: string
  name: string
}

const Header = (props: HeaderProps) => {
  const { avatar, name } = props
  const dispatch = useDispatch()
  return (
    <View style={styles.v_container}>
      <View style={styles.v_header}>
        <View style={styles.v_row}>
          {!!avatar && (
            <FstImage
              resizeMode="cover"
              style={styles.icon}
              source={{ uri: avatar }}
            />
          )}
          <TouchableOpacity
            onPress={() => {
              if (!name) {
                dispatch(navigateSwitch(SCREEN_ROUTER.AUTH))
              }
            }}
            style={styles.v_name}
          >
            <Text style={styles.txt_name}>
              {name ? name : `${R.strings().login}`}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              NavigationUtil.navigate(SCREEN_ROUTER_APP.CONTACT)
            }}
          >
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
    paddingTop:
      Platform.OS == 'ios'
        ? getStatusBarHeight() + 18
        : isIphoneX()
        ? getStatusBarHeight() + 20
        : 16,
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
    borderRadius: 36 / 2,
  },
  v_name: {
    flex: 1,
    marginLeft: 16,
  },
  txt_name: {
    ...fonts.semi_bold16,
    color: 'white',
  },
})
