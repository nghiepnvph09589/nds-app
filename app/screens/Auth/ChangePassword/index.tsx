import R from '@app/assets/R'
import RNButton from '@app/components/RNButton/RNButton'
import RNTextInput from '@app/components/RNTextInput'
import ScreenWrapper from '@app/components/Screen/ScreenWrapper'
import { SCREEN_ROUTER_AUTH } from '@app/constant/Constant'
import NavigationUtil from '@app/navigation/NavigationUtil'
import { colors, fonts } from '@app/theme'
import { showMessages } from '@app/utils/AlertHelper'
import { Formik } from 'formik'
import React, { memo } from 'react'
import isEqual from 'react-fast-compare'
import { StyleSheet, Text } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as Yup from 'yup'

const ChangePasswordComponent = () => {
  const ChangePasswordSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, R.strings().validatePassword)
      .max(25, R.strings().validatePassword)
      .required(R.strings().password_blank),
    confirmPassword: Yup.string()
      .min(6, R.strings().validatePassword)
      .max(25, R.strings().validatePassword)
      .required(R.strings().password_blank),
  })
  const _onSubmit = (dataInput: {
    password: string
    confirmPassword: string
  }) => {
    if (dataInput.password !== dataInput.confirmPassword) {
      showMessages(
        R.strings().notification,
        R.strings().confirm_password_not_success
      )
      return
    }
    NavigationUtil.navigate(SCREEN_ROUTER_AUTH.LOGIN)
  }
  return (
    <ScreenWrapper
      back
      unsafe
      color={colors.text}
      backgroundHeader="white"
      forceInset={['left']}
      titleHeader={R.strings().change_password}
      children={
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="always"
          style={styles.v_keyboard}
          enableAutomaticScroll={false}
        >
          <Text style={styles.v_note} children={R.strings().note_change_pass} />
          <Formik
            initialValues={{ password: '', confirmPassword: '' }}
            onSubmit={_onSubmit}
            validationSchema={ChangePasswordSchema}
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
                  placeholder={R.strings().password}
                  leftIcon={R.images.ic_lock}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  onSubmitEditing={() => setSubmitting(true)}
                  value={values.password}
                  errorMessage={errors.password}
                  touched={touched.password}
                  secureTextEntry
                />
                <RNTextInput
                  containerStyle={styles.v_container_input2}
                  errorStyle={styles.txt_error}
                  returnKeyType={'done'}
                  inputContainerStyle={styles.v_input}
                  placeholder={R.strings().confirm_password}
                  leftIcon={R.images.ic_lock}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  onSubmitEditing={() => setSubmitting(true)}
                  value={values.confirmPassword}
                  errorMessage={errors.confirmPassword}
                  touched={touched.confirmPassword}
                  secureTextEntry
                />
                <RNButton
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
    marginHorizontal: 67,
    marginTop: 35,
  },
  v_container_input: { marginHorizontal: 33, marginTop: 30 },
  v_container_input2: { marginHorizontal: 33, marginTop: 16 },
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
const ChangePassword = memo(ChangePasswordComponent, isEqual)

export default ChangePassword
