import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import FstImage from '@app/components/FstImage'
import R from '@app/assets/R'
import { colors, fonts } from '@app/theme'

interface InfoUser {
  avatar: string
  title: string
  setTitle: React.Dispatch<React.SetStateAction<string>>
}

const InfoUser = (props: InfoUser) => {
  const { avatar, title, setTitle } = props
  return (
    <View style={styles.v_container}>
      <FstImage
        resizeMode="cover"
        style={styles.image}
        source={avatar ? { uri: avatar } : R.images.ic_avatar_default}
      />
      <TextInput
        style={styles.text}
        placeholder="Nhập tiêu đề"
        placeholderTextColor={'#8898A7'}
        multiline={true}
        value={title}
        onChangeText={setTitle}
      />
    </View>
  )
}

export default InfoUser

const styles = StyleSheet.create({
  v_container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingTop: 20,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  image: {
    width: 36,
    height: 36,
    borderRadius: 36 / 2,
  },
  text: {
    marginLeft: 16,
    ...fonts.regular18,
    color: colors.text,
    flex: 1,
  },
})
