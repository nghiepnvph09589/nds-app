import { StyleSheet, Text, View } from 'react-native'
import { colors, fonts, styleView } from '@app/theme'

import FstImage from '@app/components/FstImage'
import R from '@app/assets/R'
import React from 'react'
import { STATUS_SUPPORT } from '@app/constant/Constant'

const StatusSupport = ({ status }: { status?: number }) => {
  const renderStatus = (status?: number) => {
    if (status === STATUS_SUPPORT.CANCEL) {
      return 'Từ chối'
    } else if (status === STATUS_SUPPORT.EDIT) {
      return 'Chờ phê duyệt'
    } else if (status === STATUS_SUPPORT.WAITING) {
      return 'Chờ phê duyệt'
    } else if (status === STATUS_SUPPORT.APPROVE) {
      return 'Đã duyệt'
    } else if (status === STATUS_SUPPORT.SUCCESS) {
      return 'Hoàn thành'
    }
  }
  return (
    <View style={styles.ctn}>
      <FstImage source={R.images.ic_status_awaiting} style={styles.img} />
      <Text style={styles.txt} children={renderStatus(status)} />
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
  },
})
