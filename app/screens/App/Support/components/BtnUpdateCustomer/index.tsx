import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { colors, fonts, styleView } from '@app/theme'

import FastImage from 'react-native-fast-image'
import NavigationUtil from '@app/navigation/NavigationUtil'
import R from '@app/assets/R'
import React from 'react'
import { SCREEN_ROUTER_APP } from '@app/constant/Constant'
import { isIphoneX } from 'react-native-iphone-x-helper'

const BtnUpdateCustomer = ({
  data,
  onAction,
}: {
  data?: dataSupportDetail
  onAction: () => void
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        NavigationUtil.navigate(SCREEN_ROUTER_APP.EDIT_SUPPORT_MANAGE, {
          id: data?.id,
          data: data,
          onAction,
        })
      }}
      style={styles.btn_update}
    >
      <View style={styles.v_btn_update}>
        <FastImage
          tintColor={colors.white}
          source={R.images.ic_edit_support}
          style={styles.ic_update}
        />
        <Text
          style={{ ...fonts.semi_bold16, color: colors.white }}
          children={'Chỉnh sửa'}
        />
      </View>
    </TouchableOpacity>
  )
}

export default BtnUpdateCustomer

const styles = StyleSheet.create({
  btn_update: {
    backgroundColor: colors.primary,
    ...styleView.rowItem,
    justifyContent: 'center',
    marginHorizontal: 15,
    paddingVertical: 14,
    borderRadius: 16,
    marginBottom: Platform.OS === 'ios' ? (isIphoneX() ? 0 : 20) : 15,
  },
  v_btn_update: {
    alignItems: 'center',
    ...styleView.rowItem,
  },
  ic_update: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
})
