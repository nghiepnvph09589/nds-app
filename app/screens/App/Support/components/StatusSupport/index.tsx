import { StyleSheet, Text, View } from 'react-native'
import { colors, fonts, styleView } from '@app/theme'

import FstImage from '@app/components/FstImage'
import R from '@app/assets/R'
import React from 'react'
import { STATUS_SUPPORT } from '@app/constant/Constant'

const StatusSupport = ({
  status,
  isUpdate,
}: {
  status?: number
  isUpdate?: number
}) => {
  const renderStatus = (status?: number) => {
    if (status === STATUS_SUPPORT.CANCEL) {
      return 'Từ chối'
    } else if (status === STATUS_SUPPORT.EDIT) {
      if (isUpdate === 1) {
        return 'Yêu cầu chỉnh sửa'
      } else {
        return 'Chưa liên hệ'
      }
    } else if (status === STATUS_SUPPORT.WAITING) {
      if (isUpdate === 1) {
        return 'Yêu cầu chỉnh sửa'
      } else {
        return 'Chưa liên hệ'
      }
    } else if (status === STATUS_SUPPORT.APPROVE) {
      if (isUpdate === 1) {
        return 'Yêu cầu chỉnh sửa'
      } else {
        return 'Đã liên hệ'
      }
    } else if (status === STATUS_SUPPORT.SUCCESS) {
      return 'Hoàn thành'
    }
  }
  return (
    <View style={styles.ctn}>
      <FstImage
        source={
          status === 1 || status === 2
            ? R.images.ic_phone_support
            : R.images.ic_status_awaiting
        }
        style={styles.img}
      />
      <Text style={styles.txt} children={renderStatus(status)} />
      {status === STATUS_SUPPORT.WAITING && (
        <View style={styles.district_acc}>
          <Text
            style={{ color: colors.primary, ...fonts.regular12 }}
            children={'Huyện đã liên hệ'}
          />
        </View>
      )}
    </View>
  )
}

export default StatusSupport

const styles = StyleSheet.create({
  ctn: {
    backgroundColor: '#FBE9E8',
    paddingVertical: 15,
    ...styleView.rowItem,
    alignItems: 'center',
  },
  img: {
    width: 25,
    height: 25,
    marginHorizontal: 15,
  },
  txt: {
    ...fonts.semi_bold16,
    color: colors.primary,
    flex: 1,
  },
  district_acc: {
    paddingHorizontal: 7,
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 3,
    borderColor: colors.primary,
    marginRight: 15,
  },
})
