import { fonts } from '@app/theme'
import React from 'react'
import { StyleSheet, TextInput } from 'react-native'

interface InputPostProps {
  content: string
  setContent: React.Dispatch<React.SetStateAction<string>>
}

const InputPost = (props: InputPostProps) => {
  const { content, setContent } = props
  return (
    <TextInput
      placeholderTextColor={'#8898A7'}
      style={styles.styleInput}
      placeholder="Nhập nội dung chia sẻ..."
      multiline={true}
      value={content}
      returnKeyType="done"
      onChangeText={setContent}
    />
  )
}

export default InputPost

const styles = StyleSheet.create({
  styleInput: {
    paddingTop: 16,
    paddingHorizontal: 15,
    ...fonts.regular16,
    backgroundColor: 'white',
    paddingBottom: 100,
  },
})
