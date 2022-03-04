import R from '@app/assets/R'
import RNButton from '@app/components/RNButton/RNButton'
import RNTextInput from '@app/components/RNTextInput'
import ScreenWrapper from '@app/components/Screen/ScreenWrapper'
import { SCREEN_ROUTER_AUTH } from '@app/constant/Constant'
import NavigationUtil from '@app/navigation/NavigationUtil'
import { colors, fonts } from '@app/theme'
import { Formik } from 'formik'
import React, { memo } from 'react'
import isEqual from 'react-fast-compare'
import { StyleSheet, Text } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as Yup from 'yup'

const ForgetPasswordScreenComponent = () => {
  const ForgetPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, R.strings().validatePassword)
      .max(25, R.strings().validatePassword)
      .required(R.strings().password_blank),
  })
  const _onSubmit = () => {
    NavigationUtil.navigate(SCREEN_ROUTER_AUTH.CHANGE_PASSWORD)
  }
  return (
    <ScreenWrapper
      back
      unsafe
      color={colors.text}
      backgroundHeader="white"
      forceInset={['left']}
      titleHeader={R.strings().forgot_password}
      children={
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="always"
          style={styles.v_keyboard}
          enableAutomaticScroll={false}
        >
          <Text style={styles.v_note} children={R.strings().note_pass} />
          <Formik
            initialValues={{ password: '' }}
            onSubmit={_onSubmit}
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
                  errorStyle={styles.txt_error}
                  containerStyle={styles.v_container_input}
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
                <Text style={styles.txt_question}>
                  {R.strings().question_email}{' '}
                  <Text style={styles.txt_send_back}>
                    {R.strings().send_back}
                  </Text>
                </Text>
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
  txt_error: {
    color: 'red',
  },
  v_keyboard: {
    flex: 1,
    backgroundColor: 'white',
  },
  v_note: {
    textAlign: 'center',
    ...fonts.regular16,
    color: colors.text,
    marginHorizontal: 53,
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
  txt_question: {
    ...fonts.regular16,
    color: colors.text,
    textAlign: 'center',
    marginTop: 24,
  },
  txt_send_back: {
    ...fonts.regular16,
    color: '#D9251B',
  },
})
const ForgetPasswordStep2 = memo(ForgetPasswordScreenComponent, isEqual)

export default ForgetPasswordStep2
