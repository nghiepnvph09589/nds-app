import * as Yup from 'yup'

import {
  API_STATUS,
  NAME_REGEX,
  PHONE_REGEX,
  ROLE,
  SCREEN_ROUTER_APP,
} from '@app/constant/Constant'
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, fonts, styleView } from '@app/theme'
import { createSupport, getListFormSupport } from './api'
import { hideLoading, showLoading } from '@app/utils/LoadingProgressRef'
import { showConfirm, showMessages } from '@app/utils/AlertHelper'

import { Formik } from 'formik'
import FstImage from '@app/components/FstImage'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Messages from '@app/components/Messages'
import NavigationUtil from '@app/navigation/NavigationUtil'
import R from '@app/assets/R'
import RNTextInput from '@app/components/RNTextInput'
import ScreenWrapper from '@app/components/Screen/ScreenWrapper'
import SelectForm from '../components/SelectForm'
import { itemFormSupport } from './model'
import { useAppSelector } from '@app/store'

interface Props {
  route: { params: { id: number } }
}
const CreateSupportScreen = (props: Props) => {
  const userInfo = useAppSelector(state => state.accountReducer.data)
  const [messagesStatus, setMessagesStatus] = useState<boolean>(false)
  const [form, setForm] = useState<number[]>([])
  const [dataFormSupport, setDataFormSupport] = useState<itemFormSupport[]>([])
  const Schema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .matches(NAME_REGEX, 'Tên sai định dạng')
      .required(R.strings().name_blank),
    phone: Yup.string()
      .matches(PHONE_REGEX, R.strings().validatePhone)
      .min(10, R.strings().validatePhone)
      .max(11, R.strings().validatePhone)
      .required(R.strings().phone_blank),
    email: Yup.string()
      .email(R.strings().validateEmail)
      .required(R.strings().email_blank),
    noteMessages: Yup.string().required(R.strings().note_blank),
  })

  const getDataFormSupport = async () => {
    Keyboard.dismiss()
    const payload = {
      page: 1,
      limit: 20,
    }
    showLoading()
    try {
      const res = await getListFormSupport(payload)
      if (res?.code === API_STATUS.SUCCESS) {
        setDataFormSupport(
          res?.data.filter((item: { type: number }) => item?.type === 2)
        )
      }
    } catch (error) {
      console.log(error)
    } finally {
      hideLoading()
    }
  }
  const onSubmit = (value: {
    name: string
    phone: string
    email: string
    noteMessages: string
  }) => {
    showConfirm(R.strings().notification, 'Xác nhận ủng hộ', () => {
      postSupport(value)
    })
  }
  const postSupport = async (value: {
    name: string
    phone: string
    email: string
    noteMessages: string
  }) => {
    Keyboard.dismiss()
    if (!form.length) {
      showMessages(R.strings().notification, 'Vui lòng chọn hình thức ủng hộ')
      return
    }
    const payload = {
      donate_request_id: props?.route?.params?.id,
      phone: value.phone,
      name: value.name,
      form_support: form,
      email: value.email,
      note: value?.noteMessages,
    }
    showLoading()
    try {
      const res = await createSupport(payload)
      if (res?.code === API_STATUS.SUCCESS) {
        // showMessages('Thông báo', 'Ủng hộ của bạn đã được gửi!!', () => {
        //   NavigationUtil.replace(SCREEN_ROUTER_APP.LIST_SUPPORT, {
        //     pageProvince: userInfo?.role === ROLE?.OFFICER_PROVINCE ? 1 : 0,
        //   })
        // })
        setMessagesStatus(true)
      }
    } catch (error) {
      console.log(error)
    } finally {
      hideLoading()
    }
  }

  useEffect(() => {
    getDataFormSupport()
  }, [])
  return (
    <ScreenWrapper
      back
      scroll={false}
      color={colors.text}
      backgroundHeader="white"
      forceInset={['left']}
      titleHeader={R.strings().support}
      borderBottomHeader={colors.border}
    >
      <Formik
        initialValues={{
          name: userInfo?.name,
          phone: userInfo?.phone,
          email: userInfo?.email,
          noteMessages: '',
        }}
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
                  maxLength={10}
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
                  // leftIcon={R.images.ic_email}
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
                <SelectForm
                  data={dataFormSupport}
                  value={form}
                  onChange={setForm}
                />
              </View>
              <TouchableOpacity
                onPress={() => {
                  handleSubmit()
                }}
                style={styles.btn_submit}
              >
                <FstImage source={R.images.ic_love2} style={styles.ic_love} />
                <Text
                  style={styles.txt_submit}
                  children={'Gửi yêu cầu ủng hộ'}
                />
              </TouchableOpacity>
            </KeyboardAwareScrollView>
          </>
        )}
      </Formik>
      {messagesStatus && (
        <Messages
          hide={() => {
            NavigationUtil.replace(SCREEN_ROUTER_APP.LIST_SUPPORT, {
              pageProvince: userInfo?.role === ROLE?.OFFICER_PROVINCE ? 1 : 0,
            })
            setMessagesStatus(false)
          }}
          onAccept={() => {
            NavigationUtil.replace(SCREEN_ROUTER_APP.LIST_SUPPORT, {
              pageProvince: userInfo?.role === ROLE?.OFFICER_PROVINCE ? 1 : 0,
            })
            setMessagesStatus(false)
          }}
          description={
            userInfo?.role === ROLE?.OFFICER_PROVINCE
              ? 'Cảm ơn bạn đã ủng hộ'
              : 'Cảm ơn bạn đã ủng hộ. Chúng tôi sẽ liên hệ với bạn để xác nhận thông tin'
          }
          bannerNotify={R.images.img_empty}
        />
      )}
    </ScreenWrapper>
  )
}

export default CreateSupportScreen

const styles = StyleSheet.create({
  ctn: {
    backgroundColor: colors.white,
    marginTop: 1,
    padding: 15,
    // flex: 1,
  },
  content_ctn: {
    // flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 30,
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
    marginTop: 15,
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
