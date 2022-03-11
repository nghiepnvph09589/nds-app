import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FstImage from '@app/components/FstImage'
import R from '@app/assets/R'
import { colors, fonts } from '@app/theme'

interface InfoUser {
  avatar: string
  name: string
}

const InfoUser = (props: InfoUser) => {
  const { avatar, name } = props
  return (
    <View style={styles.v_container}>
      <FstImage
        resizeMode="cover"
        style={styles.image}
        source={!!avatar ? { uri: avatar } : R.images.ic_avatar_default}
      />
      <Text
        style={{ marginLeft: 16, ...fonts.semi_bold18, color: colors.text }}
      >
        {name}
      </Text>
    </View>
  )
}

export default InfoUser

const styles = StyleSheet.create({
  v_container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    paddingLeft: 15,
  },
  image: {
    width: 36,
    height: 36,
    borderRadius: 36 / 2,
  },
})
