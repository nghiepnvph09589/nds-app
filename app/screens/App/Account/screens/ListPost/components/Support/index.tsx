import R from '@app/assets/R'
import FstImage from '@app/components/FstImage'
import { colors, fonts } from '@app/theme'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Support = () => {
  return (
    <View style={styles.v_container}>
      <FstImage
        resizeMode="contain"
        style={styles.icon}
        source={R.images.ic_love}
      />
      <Text style={styles.txt_support}>{R.strings().number_support}</Text>
      <Text style={styles.txt_number}>3</Text>
      {/* <TouchableOpacity
        onPress={() => {
          NavigationUtil.navigate(SCREEN_ROUTER_APP.CREATE_SUPPORT)
        }}
        style={styles.button}
      >
        <FstImage
          resizeMode="contain"
          style={styles.icon}
          source={R.images.ic_love2}
        />
        <Text style={styles.text}>{R.strings().support}</Text>
      </TouchableOpacity> */}
    </View>
  )
}

export default Support

const styles = StyleSheet.create({
  v_container: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  icon: {
    width: 24,
    height: 24,
  },
  txt_support: {
    marginLeft: 8,
    ...fonts.regular16,
    color: '#595959',
  },
  txt_number: {
    marginLeft: 12,
    ...fonts.regular16,
    color: colors.text,
    flex: 1,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    alignItems: 'center',
    paddingHorizontal: 11,
    paddingVertical: 8,
    borderRadius: 8,
  },
  text: {
    marginLeft: 8,
    ...fonts.semi_bold16,
    color: 'white',
  },
})