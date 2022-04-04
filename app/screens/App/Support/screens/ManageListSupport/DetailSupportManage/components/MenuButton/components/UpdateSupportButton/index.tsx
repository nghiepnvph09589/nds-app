import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors, fonts, styleView } from '@app/theme'

import FastImage from 'react-native-fast-image'
import R from '@app/assets/R'
import React from 'react'

const UpdateSupportButton = ({ onPress }: { onPress: () => void }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.accept}>
      <View style={styles.v_content_accept}>
        <FastImage
          tintColor={'white'}
          source={R.images.ic_accept_support}
          style={styles.ic_accept}
        />
        <Text
          style={{ ...fonts.semi_bold16, color: colors.white }}
          children={'Cập nhật hình ảnh'}
        />
      </View>
    </TouchableOpacity>
  )
}

export default UpdateSupportButton

const styles = StyleSheet.create({
  accept: {
    ...styleView.rowItem,
    flex: 3,
    backgroundColor: colors.primary,
    justifyContent: 'center',
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
})
