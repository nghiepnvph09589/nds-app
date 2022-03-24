import R from '@app/assets/R'
import { colors, fonts } from '@app/theme'
import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { DebounceButton } from '../Button/Button'
import { Props } from './Error.props'
const { width } = Dimensions.get('window')
const Error = (props: Props) => {
  return (
    <View style={styles.container}>
      <FastImage source={R.images.img_error} style={styles.image} />
      <Text style={styles.description}>{'Ứng dụng không phản hồi'}</Text>
      <Text style={styles.checkInternet}>{'Kiểm tra kết nối Internet'}</Text>
      <DebounceButton style={styles.button} onPress={() => props.reload()}>
        <Text style={styles.textReload}>{R.strings().try_again}</Text>
      </DebounceButton>
    </View>
  )
}
export default Error

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  image: {
    width: width / 1.5,
    height: width / 2,
    resizeMode: 'contain',
  },
  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: '10%',
    paddingVertical: 12,
    borderRadius: 50,
  },
  textReload: {
    ...fonts.regular12,
    color: 'white',
  },
  description: {
    ...fonts.regular16,
    marginTop: 8,
  },
  checkInternet: {
    ...fonts.regular14,
    marginTop: 8,
    marginBottom: '10%',
  },
})
