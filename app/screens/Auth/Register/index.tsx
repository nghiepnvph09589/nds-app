import R from '@app/assets/R'
import RNButton from '@app/components/RNButton/RNButton'
import RNTextInput from '@app/components/RNTextInput'
import ScreenWrapper from '@app/components/Screen/ScreenWrapper'
import { EMAIL_REGEX, SCREEN_ROUTER } from '@app/constant/Constant'
import { navigateSwitch } from '@app/navigation/switchNavigatorSlice'
import AsyncStorageService from '@app/service/AsyncStorage/AsyncStorageService'
import { colors, fonts } from '@app/theme'
import { showMessages } from '@app/utils/AlertHelper'
import { hideLoading, showLoading } from '@app/utils/LoadingProgressRef'
import { Formik } from 'formik'
import React, { memo, useRef, useState } from 'react'
import isEqual from 'react-fast-compare'
import { StyleSheet } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import RegisterApi from './api/RegisterApi'
import Avatar from './components/Avatar'

interface ForgetPassProps {
  route: { params: { phone: string } }
}

const ForgetPasswordScreenComponent = (props: ForgetPassProps) => {
  const dispatch = useDispatch()
  const [profileImage, setProfileImage] = useState<string>('')
  const filename = useRef<string>('')
  const RegisterSchema = Yup.object().shape({
    name: Yup.string().required(R.strings().name_blank),
    email: Yup.string()
      .matches(EMAIL_REGEX, R.strings().validateEmail)
      .required(R.strings().email_blank),
    address: Yup.string().required(R.strings().address_blank),
  })
  const handleRegister = async (item: {
    email: string
    name: string
    address: string
  }) => {
    if (!profileImage) {
      showMessages(R.strings().notification, R.strings().please_update_avatar)
      return
    }
    showLoading()
    try {
      const payload = {
        email: item.email,
        name: item.name,
        address: item.address,
        phone: props.route.params.phone,
        profile_picture_url: filename.current,
      }
      const res = await RegisterApi.register(payload)
      await AsyncStorageService.putToken(res?.data?.token)
      hideLoading()
      dispatch(navigateSwitch(SCREEN_ROUTER.MAIN))
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
      titleHeader={R.strings().register}
      children={
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="always"
          style={styles.v_keyboard}
          enableOnAndroid={true}
        >
          <Avatar
            onPress={(url: string, fileName: string) => {
              setProfileImage(url)
              filename.current = fileName
            }}
            url={profileImage}
          />
          <Formik
            initialValues={{ name: '', email: '', address: '' }}
            onSubmit={handleRegister}
            validationSchema={RegisterSchema}
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
                  placeholder={R.strings().full_name}
                  leftIcon={R.images.ic_user}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  onSubmitEditing={() => setSubmitting(true)}
                  value={values.name}
                  errorMessage={errors.name}
                  touched={touched.name}
                />
                <RNTextInput
                  containerStyle={styles.v_container_input}
                  errorStyle={styles.txt_error}
                  returnKeyType={'next'}
                  inputContainerStyle={styles.v_input}
                  placeholder={R.strings().email}
                  leftIcon={R.images.ic_email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  onSubmitEditing={() => setSubmitting(true)}
                  value={values.email}
                  errorMessage={errors.email}
                  touched={touched.email}
                />
                <RNTextInput
                  containerStyle={styles.v_container_input}
                  errorStyle={styles.txt_error}
                  returnKeyType={'done'}
                  inputContainerStyle={styles.v_input}
                  placeholder={R.strings().address}
                  leftIcon={R.images.ic_location}
                  onChangeText={handleChange('address')}
                  onBlur={handleBlur('address')}
                  onSubmitEditing={() => setSubmitting(true)}
                  value={values.address}
                  errorMessage={errors.address}
                  touched={touched.address}
                />
                <RNButton
                  onPress={handleSubmit}
                  style={styles.v_button}
                  title={R.strings().register}
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
  v_container_input: { marginHorizontal: 33, marginTop: 15 },
  v_input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
  },
  v_button: {
    marginHorizontal: 33,
    marginTop: 62,
    marginBottom: 50,
  },
  txt_error: {
    color: 'red',
  },
})
const Register = memo(ForgetPasswordScreenComponent, isEqual)

export default Register
