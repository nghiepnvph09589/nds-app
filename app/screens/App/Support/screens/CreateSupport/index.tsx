import * as Yup from 'yup'

import { NAME_REGEX, PHONE_REGEX } from '@app/constant/Constant'
import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors, fonts, styleView } from '@app/theme'

import { Formik } from 'formik'
import FstImage from '@app/components/FstImage'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import R from '@app/assets/R'
import RNTextInput from '@app/components/RNTextInput'
import ScreenWrapper from '@app/components/Screen/ScreenWrapper'
import SelectForm from './component/SelectForm'
import { showMessages } from '@app/utils/AlertHelper'

const dataForm = [
  {
    id: 1,
    name: 'Lương thực, thực phẩm',
  },
  {
    id: 2,
    name: 'Học bổng',
  },
  {
    id: 3,
    name: 'Chữa bệnh hiểm nghèo',
  },
  {
    id: 4,
    name: 'Xây nhà',
  },
  {
    id: 5,
    name: 'Sinh kế',
  },
  {
    id: 6,
    name: 'Khác',
  },
]
const CreateSupportScreen = () => {
  const [form, setForm] = useState<number[]>([])
  const Schema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .matches(NAME_REGEX, R.strings().validateEmail)
      .required(R.strings().name_blank),
    phone: Yup.string()
      .matches(PHONE_REGEX, R.strings().validatePhone)
      .min(10, R.strings().validatePhone)
      .max(11, R.strings().validatePhone)
      .required(R.strings().phone_blank),
    email: Yup.string()
      .email(R.strings().validateEmail)
      .required(R.strings().email_blank),
  })
  const onSubmit = (value: {
    name: string
    phone: string
    email: string
    noteMessages: string
  }) => {
    if (!form.length) {
      showMessages(R.strings().notification, 'Vui lòng chọn hình thức ủng hộ')
      return
    }
    const payload = {
      name: value.name,
      phone: value.phone,
      email: value.email,
      noteMessages: value?.noteMessages,
      form: form,
    }
    console.log(payload)
  }
  return (
    <ScreenWrapper
      back
      scroll={false}
      color={colors.text}
      backgroundHeader="white"
      forceInset={['left']}
      titleHeader={R.strings().support}
    >
      <Formik
        initialValues={{ name: '', phone: '', email: '', noteMessages: '' }}
        onSubmit={onSubmit}
        validationSchema={Schema}
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
            <KeyboardAwareScrollView
              keyboardShouldPersistTaps="always"
              style={styles.ctn}
              contentContainerStyle={styles.content_ctn}
            >
              <View>
                <RNTextInput
                  containerStyle={styles.container_input}
                  errorStyle={styles.txt_error}
                  returnKeyType={'next'}
                  inputContainerStyle={styles.v_input}
                  placeholder={R.strings().full_name}
                  //   leftIcon={R.images.ic_user}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  onSubmitEditing={() => setSubmitting(true)}
                  value={values.name}
                  errorMessage={errors.name}
                  touched={touched.name}
                  maxLength={255}
                />
                <RNTextInput
                  containerStyle={styles.container_input}
                  errorStyle={styles.txt_error}
                  placeholder={R.strings().phone}
                  inputContainerStyle={styles.v_input}
                  returnKeyType={'next'}
                  //   leftIcon={R.images.ic_phone}
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  onSubmitEditing={() => setSubmitting(true)}
                  value={values.phone}
                  errorMessage={errors.phone}
                  touched={touched.phone}
                  keyboardType="number-pad"
                />
                <RNTextInput
                  containerStyle={styles.container_input}
                  errorStyle={styles.txt_error}
                  placeholder={R.strings().email}
                  inputContainerStyle={styles.v_input}
                  returnKeyType={'next'}
                  //   leftIcon={R.images.ic_email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  onSubmitEditing={() => setSubmitting(true)}
                  value={values.email}
                  errorMessage={errors.email}
                  touched={touched.email}
                />
                <RNTextInput
                  containerStyle={styles.container_input}
                  errorStyle={styles.txt_error}
                  placeholder={R.strings().note_messages}
                  inputContainerStyle={styles.v_input}
                  returnKeyType={'next'}
                  //   leftIcon={R.images.ic_email}
                  onChangeText={handleChange('noteMessages')}
                  onBlur={handleBlur('noteMessages')}
                  onSubmitEditing={() => setSubmitting(true)}
                  value={values.noteMessages}
                  errorMessage={errors.noteMessages}
                  touched={touched.noteMessages}
                />
                <Text
                  style={styles.txt_form_support}
                  children={'Hình thức ủng hộ'}
                />
                <SelectForm data={dataForm} value={form} onChange={setForm} />
              </View>
              <TouchableOpacity
                onPress={handleSubmit}
                style={styles.btn_submit}
              >
                <FstImage source={R.images.ic_love2} style={styles.ic_love} />
                <Text
                  style={styles.txt_submit}
                  children={R.strings().support}
                />
              </TouchableOpacity>
            </KeyboardAwareScrollView>
          </>
        )}
      </Formik>
    </ScreenWrapper>
  )
}

export default CreateSupportScreen

const styles = StyleSheet.create({
  ctn: {
    backgroundColor: colors.white,
    marginTop: 1,
    padding: 15,
    flex: 1,
  },
  content_ctn: {
    flex: 1,
    justifyContent: 'space-between',
  },
  container_input: {
    marginTop: 16,
  },
  txt_error: {
    color: 'red',
  },
  v_input: {
    paddingVertical: 13,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
  },
  btn_submit: {
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...styleView.rowItem,
    paddingVertical: 13,
    borderRadius: 16,
    marginBottom: 5,
    bottom: 5,
  },
  ic_love: {
    width: 25,
    height: 25,
  },
  txt_submit: {
    ...fonts.semi_bold16,
    color: colors.white,
    marginLeft: 10,
  },
  txt_form_support: {
    marginTop: 16,
    ...fonts.semi_bold16,
    color: colors.textColor.gray9,
  },
})
