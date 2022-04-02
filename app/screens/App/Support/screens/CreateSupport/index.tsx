import {
  API_STATUS,
  EMAIL_REGEX,
  PHONE_REGEX,
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

import FstImage from '@app/components/FstImage'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import NavigationUtil from '@app/navigation/NavigationUtil'
import R from '@app/assets/R'
import RNTextInput from '@app/components/RNTextInput'
import ScreenWrapper from '@app/components/Screen/ScreenWrapper'
import SelectForm from './component/SelectForm'
import { itemFormSupport } from './model'

interface Props {
  route: { params: { id: number } }
}
const CreateSupportScreen = (props: Props) => {
  const [form, setForm] = useState<number[]>([])
  const [dataFormSupport, setDataFormSupport] = useState<itemFormSupport[]>([])
  const [name, setName] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [noteMessages, setNoteMessages] = useState<string>('')
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
        setDataFormSupport(res?.data)
      }
    } catch (error) {
      console.log(error)
    } finally {
      hideLoading()
    }
  }
  const onSubmit = () => {
    if (!name.trim()) {
      showMessages(R.strings().notification, 'Vui lòng nhập họ và tên')
      return
    }
    if (!phone.trim()) {
      showMessages(R.strings().notification, 'Vui lòng nhập số điện thoại')
      return
    }
    if (!PHONE_REGEX.test(phone)) {
      showMessages(
        R.strings().notification,
        'Số điện thoại không đúng định dạng'
      )
      return
    }
    if (!email.trim()) {
      showMessages(R.strings().notification, 'Vui lòng nhập email')
      return
    }
    if (!EMAIL_REGEX.test(email)) {
      showMessages(R.strings().notification, 'Email không đúng định dạng')
      return
    }
    if (!noteMessages.trim()) {
      showMessages(R.strings().notification, 'Vui lòng nhập lời nhắn')
      return
    }
    if (!form.length) {
      showMessages(R.strings().notification, 'Vui lòng chọn hình thức ủng hộ')
      return
    }
    showConfirm(R.strings().notification, 'Xác nhận ủng hộ', () => {
      postSupport()
    })
  }
  const postSupport = async () => {
    const payload = {
      donate_request_id: props?.route?.params?.id,
      phone: phone,
      name: name,
      form_support: form,
      email: email,
      note: noteMessages,
    }
    // showLoading()
    try {
      const res = await createSupport(payload)
      if (res?.status === 1) {
        showMessages(
          'Thông báo',
          'Ủng hộ của bạn đã được gửi. Vui lòng chờ xác nhận',
          () => {
            NavigationUtil.navigate(SCREEN_ROUTER_APP.LIST_SUPPORT)
          }
        )
        hideLoading()
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
    >
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
            onChangeText={setName}
            // onBlur={handleBlur('name')}
            // onSubmitEditing={() => setSubmitting(true)}
            value={name}
            // errorMessage={errors.name}
            // touched={touched.name}
            maxLength={255}
          />
          <RNTextInput
            containerStyle={styles.container_input}
            errorStyle={styles.txt_error}
            placeholder={R.strings().phone}
            inputContainerStyle={styles.v_input}
            returnKeyType={'next'}
            //   leftIcon={R.images.ic_phone}
            onChangeText={setPhone}
            // onBlur={handleBlur('phone')}
            // onSubmitEditing={() => setSubmitting(true)}
            value={phone}
            // errorMessage={errors.phone}
            // touched={touched.phone}
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
            onChangeText={setEmail}
            // onBlur={handleBlur('email')}
            // onSubmitEditing={() => setSubmitting(true)}
            value={email}
            // errorMessage={errors.email}
            // touched={touched.email}
          />
          <RNTextInput
            containerStyle={styles.container_input}
            errorStyle={styles.txt_error}
            placeholder={R.strings().note_messages}
            inputContainerStyle={styles.v_input}
            returnKeyType={'next'}
            //   leftIcon={R.images.ic_email}
            onChangeText={setNoteMessages}
            // onBlur={handleBlur('noteMessages')}
            // onSubmitEditing={() => setSubmitting(true)}
            value={noteMessages}
            // errorMessage={errors.noteMessages}
            // touched={touched.noteMessages}
          />
          <Text style={styles.txt_form_support} children={'Hình thức ủng hộ'} />
          <SelectForm data={dataFormSupport} value={form} onChange={setForm} />
        </View>
        <TouchableOpacity onPress={onSubmit} style={styles.btn_submit}>
          <FstImage source={R.images.ic_love2} style={styles.ic_love} />
          <Text style={styles.txt_submit} children={R.strings().support} />
        </TouchableOpacity>
      </KeyboardAwareScrollView>
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
