import React, { useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { colors, fonts } from '@app/theme'

import CharityHouse from './components/CharityHouse'
import ScreenWrapper from '@app/components/Screen/ScreenWrapper'

const UpdateSupportScreen = () => {
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  return (
    <ScreenWrapper
      back
      color={colors.text}
      backgroundHeader="white"
      forceInset={['left']}
      titleHeader={'Cập nhật ủng hộ'}
      backgroundColor={colors.backgroundColor}
      // scroll
    >
      <View style={styles.ctn}>
        {/* <TextInput
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
          maxLength={200}
          placeholder={'Nhâp nội dung...'}
          style={styles.input_content}
          placeholderTextColor={'#8898A7'}
        /> */}
        <CharityHouse />
      </View>
    </ScreenWrapper>
  )
}
export default UpdateSupportScreen

const styles = StyleSheet.create({
  input: {
    paddingTop: 12,
    marginTop: 17,
    borderWidth: 1,
    padding: 12,
    ...fonts.regular16,
    color: colors.textColor.gray9,
    borderRadius: 16,
    borderColor: colors.border,
  },
  ctn: {
    marginTop: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 15,
    flex: 1,
  },
  input_content: {
    paddingTop: 12,
    marginTop: 17,
    borderWidth: 1,
    padding: 12,
    ...fonts.regular16,
    color: colors.textColor.gray9,
    borderRadius: 16,
    borderColor: colors.border,
    minHeight: 100,
  },
})
