import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors, fonts, styleView } from '@app/theme'

import FastImage from 'react-native-fast-image'
import R from '@app/assets/R'
import React from 'react'

const MenuButton = () => {
  return (
    <View style={styles.ctn}>
      <TouchableOpacity style={styles.accept}>
        <View style={styles.v_content_accept}>
          <FastImage
            tintColor={'white'}
            source={R.images.ic_accept_support}
            style={styles.ic_accept}
          />
          <Text
            style={{ ...fonts.semi_bold16, color: colors.white }}
            children={'Phê duyệt'}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn_show}>
        <Text
          style={{
            ...fonts.semi_bold24,
            color: colors.primary,
          }}
          children={'...'}
        />
      </TouchableOpacity>
    </View>
  )
}

export default MenuButton

const styles = StyleSheet.create({
  ctn: {
    ...styleView.rowItem,
    paddingHorizontal: 15,
  },
  accept: {
    ...styleView.rowItem,
    flex: 3,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    marginRight: 15,
    borderRadius: 16,
    paddingVertical: 14,
  },
  v_content_accept: {
    ...styleView.rowItem,
    alignItems: 'center',
  },
  ic_accept: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  btn_show: {
    ...styleView.rowItem,
    flex: 1,
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 16,
    paddingBottom: 13,
    borderColor: colors.primary,
  },
})
