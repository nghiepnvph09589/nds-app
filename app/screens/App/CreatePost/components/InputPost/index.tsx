import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { fonts } from '@app/theme'

const InputPost = () => {
  return (
    <TextInput
      placeholderTextColor={'#8898A7'}
      style={styles.styleInput}
      placeholder="Nhập nội dung chia sẻ..."
    />
  )
}

export default InputPost

const styles = StyleSheet.create({
  styleInput: {
    marginTop: 16,
    paddingHorizontal: 15,
    ...fonts.regular16,
  },
})
