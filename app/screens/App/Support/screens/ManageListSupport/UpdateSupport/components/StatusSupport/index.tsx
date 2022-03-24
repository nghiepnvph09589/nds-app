import { StyleSheet, Text, View } from 'react-native'
import { colors, fonts, styleView } from '@app/theme'

import FstImage from '@app/components/FstImage'
import R from '@app/assets/R'
import React from 'react'

const StatusSupport = () => {
  const renderStatus = (status: number) => {
    if (status === 0) {
      return 'Từ chối'
    } else if (status === 1) {
      return 'Chờ phê duyệt'
    } else if (status === 2) {
      return 'Đã duyệt'
    }
  }
  return (
    <View style={styles.ctn}>
      <FstImage source={R.images.ic_status_awaiting} style={styles.img} />
      <Text style={styles.txt} children={renderStatus(1)} />
    </View>
  )
}

export default StatusSupport

const styles = StyleSheet.create({
  ctn: {
    backgroundColor: '#FBE9E8',
    paddingVertical: 12,
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
