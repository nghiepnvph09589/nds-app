import * as Yup from 'yup'

import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useRef, useState } from 'react'
import { hideLoading, showLoading } from '@app/utils/LoadingProgressRef'

import { API_STATUS } from '@app/constant/Constant'
import Avatar from './component/Avatar'
import { Formik } from 'formik'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import NavigationUtil from '@app/navigation/NavigationUtil'
/* eslint-disable prettier/prettier */
import R from '@app/assets/R'
import RNTextInput from '@app/components/RNTextInput'
import ScreenWrapper from '@app/components/Screen/ScreenWrapper'
import SelectCalendar from './component/SelectCalendar'
import SelectSex from './component/SelectSex'
import { colors } from '@app/theme/colors'
import { fonts } from '@app/theme'
import { getDataUserInfo } from '../../slices/AccountSlice'
import { showMessages } from '@app/utils/AlertHelper'
import { updateAccount } from './api'
import { useAppSelector } from '@app/store'
import { useDispatch } from 'react-redux'

const UpdateAccountScreen = () => {
  const dispatch = useDispatch()
  const data = useAppSelector(state => state.accountReducer.data)
  const updateSchema = Yup.object().shape({
    name: Yup.string().required(R.strings().name_blank),
    cmt: Yup.string()
      .matches(/^.{9,12}$/, 'Số CMT/CCCD không hợp lệ')
      .required('Số CMT/CCCD đang để trống'),
    email: Yup.string()
      .email(R.strings().validateEmail)
      .required(R.strings().email_blank),
    address: Yup.string().required(R.strings().address_blank),
  })
  const [profileImage, setProfileImage] = useState<string>('')
  const filename = useRef<string>('')
  const onSubmitUpdate = async (form: any) => {
    Keyboard.dismiss()
    if (!form?.dateBirth) {
      showMessages(R.strings().notification, 'Vui lòng chọn ngày sinh')
      return
    }
    if (!form?.sex) {
      showMessages(R.strings().notification, 'Vui lòng chọn giới tính')
      return
    }
    showLoading()
    try {
      const payload = {
        // email: form.email,
        name: form.name,
        address: form.address,
        profile_picture_url: filename.current || undefined,
      }
      const res = await updateAccount(payload)
      if (res.code === API_STATUS.SUCCESS) {
        await dispatch(getDataUserInfo())
        hideLoading()
        showMessages(
          R.strings().notification,
          'Bạn đã cập nhật tài khoản thành công',
          () => {
            NavigationUtil.goBack()
          }
        )
      }
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
      titleHeader={R.strings().update_account}
    >
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="always"
        style={styles.v_keyboard}
      >
        <Avatar
          source={
            profileImage ? { uri: profileImage } : R.images.img_avatar_default
          }
          onPress={(url: string, fileName: string) => {
            setProfileImage(url)
            filename.current = fileName
          }}
        />
        <Formik
          initialValues={{
            phone: data?.phone,
            name: data?.name,
            cmt: '',
            dateBirth: '',
            sex: 0,
            email: data?.email,
            address: '',
          }}
          onSubmit={onSubmitUpdate}
          validationSchema={updateSchema}
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
            <View style={styles.ctn}>
              <RNTextInput
                containerStyle={styles.ctn_input_phone}
                errorStyle={styles.txt_error}
                inputContainerStyle={styles.v_input_phone}
                returnKeyType={'next'}
                placeholder={R.strings().phone}
                leftIcon={R.images.ic_phone}
                onChangeText={handleChange('phone')}
                onBlur={handleBlur('phone')}
                onSubmitEditing={() => setSubmitting(true)}
                value={values.phone}
                errorMessage={errors.phone}
                touched={touched.phone}
                editable={false}
                // inputStyle={styles.phone_number}
              />
              <RNTextInput
                containerStyle={styles.container_input}
                errorStyle={styles.txt_error}
                returnKeyType={'next'}
                inputContainerStyle={styles.v_input_phone}
                placeholder={R.strings().email}
                leftIcon={R.images.ic_email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                onSubmitEditing={() => setSubmitting(true)}
                value={values.email}
                errorMessage={errors.email}
                touched={touched.email}
                editable={false}
              />
              <RNTextInput
                containerStyle={styles.container_input}
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
                containerStyle={styles.container_input}
                errorStyle={styles.txt_error}
                returnKeyType={'next'}
                inputContainerStyle={styles.v_input}
                placeholder={R.strings().cmt}
                leftIcon={R.images.ic_cmt}
                onChangeText={handleChange('cmt')}
                onBlur={handleBlur('cmt')}
                onSubmitEditing={() => setSubmitting(true)}
                value={values.cmt}
                errorMessage={errors.cmt}
                touched={touched.cmt}
                keyboardType="number-pad"
                maxLength={12}
              />
              <SelectCalendar
                value={values.dateBirth}
                onChange={handleChange('dateBirth')}
              />
              <SelectSex value={values.sex} onSelect={handleChange('sex')} />

              <RNTextInput
                containerStyle={styles.container_input}
                errorStyle={styles.txt_error}
                returnKeyType={'next'}
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
              <TouchableOpacity onPress={handleSubmit} style={styles.btn_save}>
                <Text style={styles.txt_save} children={R.strings().save} />
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    </ScreenWrapper>
  )
}

export default UpdateAccountScreen

const styles = StyleSheet.create({
  phone_number: {
    color: '#8898A7',
  },
  ctn_input_phone: {
    marginTop: 22,
  },
  v_input_phone: {
    paddingVertical: 15,
    backgroundColor: '#E9ECEF',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
  },
  ctn: {
    marginHorizontal: 30,
  },
  v_keyboard: {
    flex: 1,
    backgroundColor: 'white',
  },
  btn_save: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 16,
    marginTop: 27,
    marginBottom: 30,
  },
  txt_save: {
    ...fonts.semi_bold16,
    color: colors.textColor.gray1,
  },
  container_input: {
    marginTop: 28,
  },
  txt_error: {
    color: 'red',
  },
  v_input: {
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
  },
  icon_right: {
    width: 24,
    aspectRatio: 1,
    marginRight: 10,
  },
  ctn_date_birth: {
    flex: 1,
  },
})
