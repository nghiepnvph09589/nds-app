import * as Yup from 'yup'

import { Formik } from 'formik'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { PASSWORD_REGEX } from '@app/constant/Constant'
import R from '@app/assets/R'
import RNButton from '@app/components/RNButton/RNButton'
import RNTextInput from '@app/components/RNTextInput'
import React from 'react'
import ScreenWrapper from '@app/components/Screen/ScreenWrapper'
import { StyleSheet } from 'react-native'
import { colors } from '@app/theme/colors'

const ChangePassScreen = () => {
  const ChangePasswordSchema = Yup.object().shape({
    oldPass: Yup.string()
      .trim()
      .matches(PASSWORD_REGEX, R.strings().validatePassword)
      .required(R.strings().password_blank),
    newPass: Yup.string()
      .trim()
      .matches(PASSWORD_REGEX, R.strings().validatePassword)
      .required(R.strings().password_blank),
    reNewPass: Yup.string()
      .trim()
      .matches(PASSWORD_REGEX, R.strings().validatePassword)
      .oneOf([Yup.ref('newPass')], R.strings().re_password_fail)
      .required(R.strings().password_blank),
  })
  const onSubmit = (data: {
    oldPass: string
    newPass: string
    reNewPass: string
  }) => {
    console.log(data)
  }
  return (
    <ScreenWrapper
      back
      color={colors.text}
      backgroundHeader="white"
      forceInset={['left']}
      titleHeader={R.strings().change_password}
    >
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="always"
        // style={styles.v_keyboard}
      >
        <Formik
          initialValues={{ oldPass: '', newPass: '', reNewPass: '' }}
          onSubmit={onSubmit}
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
                returnKeyType={'next'}
                inputContainerStyle={styles.v_input}
                placeholder={R.strings().placeholder_current_password}
                leftIcon={R.images.ic_lock}
                onChangeText={handleChange('oldPass')}
                onBlur={handleBlur('oldPass')}
                onSubmitEditing={() => setSubmitting(true)}
                value={values.oldPass}
                errorMessage={errors.oldPass}
                touched={touched.oldPass}
                secureTextEntry
              />
              <RNTextInput
                containerStyle={styles.v_container_input}
                errorStyle={styles.txt_error}
                returnKeyType={'next'}
                inputContainerStyle={styles.v_input}
                placeholder={R.strings().placeholder_new_pass}
                leftIcon={R.images.ic_lock}
                onChangeText={handleChange('newPass')}
                onBlur={handleBlur('newPass')}
                onSubmitEditing={() => setSubmitting(true)}
                value={values.newPass}
                errorMessage={errors.newPass}
                touched={touched.newPass}
                secureTextEntry
              />
              <RNTextInput
                containerStyle={styles.v_container_input}
                errorStyle={styles.txt_error}
                returnKeyType={'done'}
                inputContainerStyle={styles.v_input}
                placeholder={R.strings().input_confirm_password}
                leftIcon={R.images.ic_lock}
                onChangeText={handleChange('reNewPass')}
                onBlur={handleBlur('reNewPass')}
                onSubmitEditing={() => setSubmitting(true)}
                value={values.reNewPass}
                errorMessage={errors.reNewPass}
                touched={touched.reNewPass}
                secureTextEntry
              />
              <RNButton
                onPress={handleSubmit}
                style={styles.v_button}
                title={R.strings().confirm}
              />
            </>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    </ScreenWrapper>
  )
}

export default ChangePassScreen

const styles = StyleSheet.create({
  v_container_input: {
    marginHorizontal: 33,
    marginTop: 16,
  },
  v_input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
  },
  txt_error: {
    color: 'red',
  },
  v_button: {
    marginHorizontal: 33,
    marginTop: 32,
  },
})
