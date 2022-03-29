import { StyleSheet, TextInput, View } from 'react-native'
import { colors, fonts } from '@app/theme'

import React from 'react'

const InputUpdate = ({
  title,
  content,
  setTitle,
  setContent,
}: {
  title: string
  content: string
  setTitle: (text: string) => void
  setContent: (text: string) => void
}) => {
  return (
    <View style={styles.ctn}>
      <TextInput
        onChangeText={text => setTitle(text)}
        value={title}
        multiline
        maxLength={200}
        placeholder={'Nhâp tiêu để...'}
        style={styles.input}
        placeholderTextColor={'#8898A7'}
      />
      <TextInput
        onChangeText={text => setContent(text)}
        value={content}
        multiline
        // maxLength={200}
        placeholder={'Nhâp nội dung...'}
        style={styles.input_content}
        placeholderTextColor={'#8898A7'}
      />
    </View>
  )
}
export default InputUpdate

const styles = StyleSheet.create({
  input: {
    paddingTop: 14,
    marginTop: 17,
    borderWidth: 1,
    padding: 12,
    ...fonts.regular16,
    color: colors.textColor.gray9,
    borderRadius: 16,
    borderColor: colors.border,
  },
  input_content: {
    paddingTop: 14,
    marginTop: 17,
    borderWidth: 1,
    padding: 12,
    ...fonts.regular16,
    color: colors.textColor.gray9,
    borderRadius: 16,
    borderColor: colors.border,
    minHeight: 100,
    maxHeight: 200,
  },
  ctn: {
    paddingHorizontal: 15,
  },
})
