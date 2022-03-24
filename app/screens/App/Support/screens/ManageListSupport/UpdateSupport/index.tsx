import { ScrollView, StyleSheet, View } from 'react-native'
import { colors, fonts } from '@app/theme'

import CharityHouse from './components/CharityHouse'
import MenuButton from './components/MenuButton'
import React from 'react'
import ScreenWrapper from '@app/components/Screen/ScreenWrapper'
import StatusSupport from './components/StatusSupport'

const UpdateSupportScreen = () => {
  return (
    <ScreenWrapper
      back
      color={colors.text}
      backgroundHeader="white"
      forceInset={['left']}
      titleHeader={'Cập nhật ủng hộ'}
      backgroundColor={colors.backgroundColor}
      style={{ flex: 1 }}
      // scroll
    >
      <ScrollView>
        <StatusSupport />
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
      </ScrollView>
      <MenuButton />
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
    backgroundColor: colors.white,
    paddingHorizontal: 15,
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
