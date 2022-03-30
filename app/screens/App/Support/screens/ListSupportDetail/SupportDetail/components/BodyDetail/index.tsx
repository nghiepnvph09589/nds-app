import { StyleSheet, View } from 'react-native'

import DateUtils from '@app/utils/DateUtils'
import FormSupport from './components/FormSupport'
import ListImage from './components/ListImage'
import React from 'react'
import RowDetail from './components/RowDetail'
import VideoComponent from './components/VideoComponent'
import { colors } from '@app/theme'

const BodyDetail = ({ data }: { data?: dataSupportDetail }) => {
  const listVideo = data?.DonateImages.filter(item => item?.type === 2)
  const listImage = data?.DonateImages.filter(item => item?.type === 1)
  return (
    <View style={stylesBody.ctn_default}>
      <View style={stylesBody.ctn}>
        <RowDetail
          name={'Ngày thực hiện'}
          value={DateUtils.formatShortDate(data?.create_at)}
        />
        <RowDetail name={'Người ủng hộ'} value={data?.name} />
        <RowDetail name={'Số điện thoại'} value={data?.phone} />
        <RowDetail name={'Nội dung'} value={data?.content} />
        <FormSupport data={data} />
        {listImage?.length !== 0 && <ListImage data={data} />}
        {listVideo?.length !== 0 && <VideoComponent data={data} />}
      </View>
    </View>
  )
}

export default BodyDetail

const stylesBody = StyleSheet.create({
  ctn_default: {
    backgroundColor: colors.white,
    paddingHorizontal: 8,
    paddingBottom: 20,
  },
  ctn: {
    borderWidth: 1,
    padding: 15,
    borderRadius: 12,
    borderColor: colors.border,
  },
})
