import R from '@app/assets/R'
import FstImage from '@app/components/FstImage'
import RNButton from '@app/components/RNButton/RNButton'
import RNTextInput from '@app/components/RNTextInput'
import { SCREEN_ROUTER_AUTH } from '@app/constant/Constant'
import NavigationUtil from '@app/navigation/NavigationUtil'
import { fonts } from '@app/theme'
import { Formik } from 'formik'
import React from 'react'
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { isIphoneX } from 'react-native-iphone-x-helper'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as Yup from 'yup'
const { height, width } = Dimensions.get('window')

const LoginStep2 = () => {
  const LoginSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, R.strings().validatePassword)
      .max(25, R.strings().validatePassword)
      .required(R.strings().password_blank),
  })
  const _onSubmit = () => {}
  return (
    <View style={styles.v_keyboard}>
      <ImageBackground
        resizeMode="cover"
        style={styles.img_background}
        source={R.images.img_login}
      >
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}
          enableOnAndroid={true}
        >
          <FstImage
            style={styles.img_red_cross}
            source={R.images.img_red_cross}
          />
          <View style={styles.v_container}>
            <Text style={styles.txt_login}>{R.strings().login}</Text>
            <Text style={styles.txt_note}>{R.strings().password_note}</Text>
            <Formik
              initialValues={{ password: '' }}
              onSubmit={_onSubmit}
              validationSchema={LoginSchema}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                setSubmitting,
                values,
                errors,
                touched,
              }) => (
                <>
                  <RNTextInput
                    returnKeyType={'done'}
                    containerStyle={styles.v_input}
                    placeholder={R.strings().password}
                    leftIcon={R.images.ic_lock}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    onSubmitEditing={() => setSubmitting(true)}
                    value={values.password}
                    errorMessage={errors.password}
                    touched={touched.password}
                    secureTextEntry={true}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      NavigationUtil.navigate(
                        SCREEN_ROUTER_AUTH.FORGET_PASSWORD
                      )
                    }}
                  >
                    <Text style={styles.txt_forgot_pass}>
                      {R.strings().forgot_password}
                    </Text>
                  </TouchableOpacity>
                  <RNButton
                    onPress={handleSubmit}
                    style={styles.v_button}
                    title={R.strings().login}
                  />
                </>
              )}
            </Formik>
          </View>
        </KeyboardAwareScrollView>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  v_input: {
    marginTop: 24,
    marginBottom: 19,
  },
  v_keyboard: {
    flex: 1,
    backgroundColor: 'white',
  },
  img_background: { width: width, height: height },
  img_red_cross: {
    width: 156,
    aspectRatio: 1,
    marginTop: isIphoneX() ? 51 : 20,
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
    paddingHorizontal: 15,
    marginBottom: 40,
  },
  txt_note: {
    ...fonts.regular16,
    color: '#FFB7B7',
    marginTop: 37,
    marginHorizontal: 42,
    textAlign: 'center',
  },
  txt_login: {
    ...fonts.semi_bold24,
    color: 'white',
    marginTop: 36,
    textAlign: 'center',
  },
  v_button: {
    marginBottom: isIphoneX() ? 40 : 60,
  },
  txt_forgot_pass: {
    ...fonts.regular16,
    color: '#FFB7B7',
    textAlign: 'center',
    marginBottom: 20,
  },
})

export default LoginStep2
