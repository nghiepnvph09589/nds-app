import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import FstImage from '@app/components/FstImage'
import { colors, fonts } from '@app/theme'
import R from '@app/assets/R'

const ButtonImage = () => {
  return (
    <TouchableOpacity style={styles.v_row}>
      <FstImage style={styles.icon} source={R.images.ic_image} />
      <Text style={styles.text}>Ảnh/video</Text>
    </TouchableOpacity>
  )
}

export default ButtonImage

const styles = StyleSheet.create({
  v_row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    marginTop: 1,
  },
  icon: {
    width: 24,
    height: 24,
  },
  text: {
    ...fonts.semi_bold16,
    marginLeft: 16,
    color: colors.text,
  },
})
