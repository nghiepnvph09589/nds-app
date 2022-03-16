import { fonts } from '@app/theme'
import React from 'react'
import { StyleSheet, TextInput } from 'react-native'

const InputPost = () => {
  return (
    <TextInput
      placeholderTextColor={'#8898A7'}
      style={styles.styleInput}
      placeholder="Nhập nội dung chia sẻ..."
      multiline={true}
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
