import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { colors, fonts } from '@app/theme'
import { hideLoading, showLoading } from '@app/utils/LoadingProgressRef'
import { showConfirm, showMessages } from '@app/utils/AlertHelper'

import { API_STATUS } from '@app/constant/Constant'
import FastImage from 'react-native-fast-image'
import Modal from 'react-native-modal'
import R from '@app/assets/R'
import { requestEditSupport } from '../../../../DetailSupportManage/api'

const ModalReasonEdit = ({
  showRequest,
  setShowRequest,
  submit,
  id,
}: {
  showRequest: boolean
  setShowRequest: (status: boolean) => void
  submit: () => void
  id?: number
}) => {
  const [reason, setReason] = useState<string>('')

  const onSubmit = () => {
    showConfirm(
      R.strings().notification,
      'Bạn chắc chắn yêu cầu sửa ủng hộ này?',
      () => {
        send()
      }
    )
  }
  const send = async () => {
    if (reason.trim() === '') {
      showMessages(R.strings().notification, 'Vui lòng nhập nội dung chỉnh sửa')
      return
    }
    const payload: {
      id?: number
      params: { reason_request: string }
    } = {
      id: id,
      params: {
        reason_request: reason,
      },
    }
    showLoading()
    try {
      const res = await requestEditSupport(payload)
      if (res?.code === API_STATUS.SUCCESS) {
        showMessages(
          R.strings().notification,
          'Đã yêu cầu chỉnh sửa ủng hộ',
          () => {
            setShowRequest(false)
            submit()
          }
        )
      }
    } catch (error) {
      console.log(error)
    } finally {
      hideLoading()
    }
  }
  return (
    <Modal
      onBackdropPress={() => {
        setShowRequest(false)
      }}
      isVisible={showRequest}
    >
      <View style={styles.ctn}>
        <View style={styles.v_title}>
          <Text style={styles.txt_title} children={'Yêu cầu chỉnh sửa'} />
          <TouchableOpacity
            onPress={() => {
              setShowRequest(false)
            }}
            style={styles.btn_close}
          >
            <FastImage source={R.images.ic_close} style={styles.ic_close} />
          </TouchableOpacity>
        </View>
        <TextInput
          onChangeText={text => setReason(text)}
          value={reason}
          multiline
          maxLength={225}
          placeholder={'Nhập nội dung yêu cầu chỉnh sửa'}
          style={styles.input_content}
          placeholderTextColor={'#8898A7'}
        />
        <TouchableOpacity onPress={onSubmit} style={styles.submit}>
          <Text
            style={{
              ...fonts.semi_bold16,
              color: colors.white,
            }}
            children={'Gửi'}
          />
        </TouchableOpacity>
      </View>
    </Modal>
  )
}
export default ModalReasonEdit
const styles = StyleSheet.create({
  input_content: {
    paddingTop: 14,
    marginTop: 20,
    borderWidth: 1,
    padding: 12,
    ...fonts.regular16,
    color: colors.textColor.gray9,
    borderRadius: 16,
    borderColor: colors.border,
    minHeight: 110,
    maxHeight: 200,
  },
  submit: {
    marginTop: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    padding: 15,
    borderRadius: 16,
  },
  ic_close: { width: 25, height: 25 },
  btn_close: { position: 'absolute', top: 0, right: 0 },
  txt_title: {
    ...fonts.semi_bold18,
    color: colors.textColor.gray8,
    marginTop: 10,
  },
  ctn: {
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 16,
  },
  v_title: { alignItems: 'center' },
})
