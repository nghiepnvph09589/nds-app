import * as Yup from 'yup'

import {
  API_STATUS,
  PASSWORD_REGEX,
  SCREEN_ROUTER,
} from '@app/constant/Constant'
import {
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { hideLoading, showLoading } from '@app/utils/LoadingProgressRef'

import AsyncStorageService from '@app/service/AsyncStorage/AsyncStorageService'
import { Formik } from 'formik'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import R from '@app/assets/R'
import RNTextInput from '@app/components/RNTextInput'
import React from 'react'
import ScreenWrapper from '@app/components/Screen/ScreenWrapper'
import { changePassword } from './api'
import { colors } from '@app/theme/colors'
import { fonts } from '@app/theme'
import { isIphoneX } from 'react-native-iphone-x-helper'
import { logout } from '../../slices/AccountSlice'
import { navigateSwitch } from '@app/navigation/switchNavigatorSlice'
import { requestLogout } from '../../api/AccountApi'
import { showMessages } from '@app/utils/AlertHelper'
import { useDispatch } from 'react-redux'

const ChangePassScreen = () => {
  const dispatch = useDispatch()
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
  const onSubmit = async (data: {
    oldPass: string
    newPass: string
    reNewPass: string
  }) => {
    Keyboard.dismiss()
    showLoading()
    try {
      const payload = {
        old_password: data?.oldPass,
        new_password: data?.newPass,
      }
      const res = await changePassword(payload)
      if (res.code === API_STATUS.SUCCESS) {
        hideLoading()
        showMessages(
          R.strings().notification,
          'Bạn đã cập nhật mật khẩu thành công',
          () => {
            // NavigationUtil.goBack()
            handleLogout()
          }
        )
      }
    } catch (error) {
      hideLoading()
    }
  }
  const handleLogout = async () => {
    await requestLogout({})
    dispatch(logout())
    await AsyncStorageService.putToken('')
    dispatch(navigateSwitch(SCREEN_ROUTER.AUTH))
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
        style={styles.ctn}
        contentContainerStyle={styles.content_ctn}
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
              <View>
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
              </View>
              <TouchableOpacity onPress={handleSubmit} style={styles.btn}>
                <Text
                  style={styles.txt_confirm}
                  children={R.strings().confirm}
                />
              </TouchableOpacity>
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
    marginHorizontal: 15,
    marginTop: 16,
  },
  v_input: {
    borderWidth: 1,
    borderColor: colors.border,
  },
  txt_error: {
    color: 'red',
  },
  v_button: {
    marginHorizontal: 30,
    marginTop: 32,
  },
  ctn: {
    backgroundColor: colors.white,
    marginTop: 1,
    flex: 1,
  },
  content_ctn: {
    flex: 1,
    justifyContent: 'space-between',
  },
  btn: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    paddingVertical: 13,
    marginHorizontal: 15,
    borderRadius: 15,
    marginBottom: Platform.OS === 'ios' ? (isIphoneX() ? 0 : 20) : 15,
  },
  txt_confirm: {
    ...fonts.semi_bold16,
    color: colors.white,
  },
})
