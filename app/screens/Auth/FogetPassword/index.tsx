import R from '@app/assets/R'
import RNButton from '@app/components/RNButton/RNButton'
import RNTextInput from '@app/components/RNTextInput'
import ScreenWrapper from '@app/components/Screen/ScreenWrapper'
import { EMAIL_REGEX, SCREEN_ROUTER_AUTH } from '@app/constant/Constant'
import NavigationUtil from '@app/navigation/NavigationUtil'
import { colors, fonts } from '@app/theme'
import { hideLoading, showLoading } from '@app/utils/LoadingProgressRef'
import { Formik } from 'formik'
import React, { memo } from 'react'
import isEqual from 'react-fast-compare'
import { StyleSheet, Text } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as Yup from 'yup'
import ForgetPasswordApi from './api/ForgetPasswordApi'

const ForgetPasswordScreenComponent = () => {
  const ForgetPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .matches(EMAIL_REGEX, R.strings().validateEmail)
      .required(R.strings().email_blank),
  })
  const handleForgetPass = async (item: { email: string }) => {
    try {
      showLoading()
      await ForgetPasswordApi.forgetPass({ email: item.email })
      hideLoading()
      NavigationUtil.navigate(SCREEN_ROUTER_AUTH.FORGET_PASSWORD_STEP_2, {
        email: item.email,
      })
    } catch (error) {
      hideLoading()
    }
  }
  return (
    <ScreenWrapper
      back
      color={colors.text}
      backgroundHeader="white"
      forceInset={['left']}
      titleHeader={R.strings().forgot_password}
      children={
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="always"
          style={styles.v_keyboard}
        >
          <Text style={styles.v_note} children={R.strings().note_email} />
          <Formik
            initialValues={{ email: '' }}
            onSubmit={handleForgetPass}
            validationSchema={ForgetPasswordSchema}
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
                  containerStyle={styles.v_container_input}
                  errorStyle={styles.txt_error}
                  returnKeyType={'done'}
                  inputContainerStyle={styles.v_input}
                  placeholder={R.strings().email}
                  leftIcon={R.images.ic_email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  onSubmitEditing={() => setSubmitting(true)}
                  value={values.email}
                  errorMessage={errors.email}
                  touched={touched.email}
                  maxLength={255}
                />
                <RNButton
                  icon
                  onPress={handleSubmit}
                  style={styles.v_button}
                  title={R.strings().next}
                />
              </>
            )}
          </Formik>
        </KeyboardAwareScrollView>
      }
    />
  )
}

const styles = StyleSheet.create({
  v_keyboard: {
    flex: 1,
    backgroundColor: 'white',
  },
  v_note: {
    textAlign: 'center',
    ...fonts.regular16,
    color: colors.text,
    marginHorizontal: 20,
    marginTop: 35,
  },
  v_container_input: { marginHorizontal: 33, marginTop: 30 },
  v_input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
  },
  v_button: {
    marginHorizontal: 33,
    marginTop: 32,
  },
  txt_error: {
    color: 'red',
  },
})
const ForgetPassword = memo(ForgetPasswordScreenComponent, isEqual)

export default ForgetPassword
