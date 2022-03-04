import R from '@app/assets/R'
import FstImage from '@app/components/FstImage'
import RNTextInput from '@app/components/RNTextInput'
import { fonts } from '@app/theme'
import React from 'react'
import {
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import { Input } from 'react-native-elements'
const { height, width } = Dimensions.get('window')

const LoginScreen = () => {
  return (
    <KeyboardAvoidingView
      style={styles.v_keyboard}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      //behavior={'padding'}
      //keyboardVerticalOffset={-1000}
    >
      <ImageBackground
        resizeMode="cover"
        style={styles.img_background}
        source={R.images.img_login}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <FstImage
            style={styles.img_red_cross}
            source={R.images.img_red_cross}
          />
          <View style={styles.v_container}>
            <Text style={styles.txt_login}>{R.strings().login}</Text>
            <Text style={styles.txt_note}>
              Nhập số điện thoại của bạn để tiếp tục
            </Text>

            <RNTextInput />
          </View>
        </ScrollView>
      </ImageBackground>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  v_keyboard: {
    flex: 1,
    backgroundColor: 'white',
  },
  img_background: { width: width, height: height },
  img_red_cross: {
    width: 156,
    aspectRatio: 1,
    marginTop: 51,
    alignSelf: 'center',
  },
  v_container: {
    width: width * 0.8,
    backgroundColor: '#FFFFFF10',
    borderColor: '#FFFFFF37',
    borderWidth: 1,
    marginTop: 27,
    alignSelf: 'center',
    borderRadius: 10,
  },
  txt_note: {
    ...fonts.regular16,
    color: '#FFB7B7',
    marginTop: 34,
    marginHorizontal: 42,
    textAlign: 'center',
  },
  txt_login: {
    ...fonts.semi_bold24,
    color: 'white',
    marginTop: 25,
    textAlign: 'center',
  },
  // v_scroll: {
  //   backgroundColor: 'white',
  //   flex: 1,
  // },
  // img_bg: {
  //   width: '100%',
  //   height: height / 2.4,
  // },
  // ic_back: {
  //   position: 'absolute',
  //   width: 40,
  //   height: 40,
  //   top: isIphoneX() ? getStatusBarHeight() + 20 : getStatusBarHeight(),
  //   left: 25,
  // },
  // root_view: {
  //   paddingHorizontal: 30,
  //   borderWidth: 0,
  //   justifyContent: 'center',
  //   // borderRadius: 1,
  //   flex: 1,
  //   borderTopLeftRadius: 30,
  //   borderTopRightRadius: 30,
  //   shadowOffset: {
  //     height: 0,
  //     width: 0,
  //   },
  //   marginHorizontal: 0,
  //   shadowRadius: 0,
  //   marginTop: -60,
  // },
  // ic_check: {
  //   width: 18,
  //   height: 18,
  // },
  // v_container: {
  //   paddingVertical: 40,
  // },
  // img_logo: {
  //   height: 45,
  //   width: 133,
  //   alignSelf: 'center',
  // },
  // txt_title: {
  //   marginVertical: 24,
  //   fontFamily: R.fonts.san_regular,
  //   fontSize: 15,
  //   alignSelf: 'center',
  // },
  // containerChk: {
  //   flex: 1,
  //   backgroundColor: 'white',
  //   borderWidth: 0,
  //   marginLeft: 0,
  //   padding: 0,
  //   //  / paddingBottom: 15,
  // },
  // text: {
  //   fontSize: 14,
  //   fontFamily: R.fonts.san_regular,
  //   fontWeight: '400',
  //   color: colors.label,
  // },
  // txt_forgot_pass: {
  //   color: colors.colorDefault.text,
  //   fontSize: 14,
  //   fontFamily: R.fonts.san_regular,
  //   justifyContent: 'flex-end',
  //   alignSelf: 'flex-end',
  // },
  // v_forgot_pass: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   marginBottom: 40,
  // },
  // v_register: {
  //   flexDirection: 'row',
  //   marginTop: -60,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   marginBottom: 15,
  // },
  // txt_question: {
  //   fontFamily: R.fonts.san_regular,
  //   fontSize: 15,
  //   color: 'black',
  // },
  // txt_register: {
  //   fontFamily: R.fonts.san_regular,
  //   fontSize: 16,
  //   color: colors.primary,
  //   marginLeft: 5,
  // },
})

export default LoginScreen
