import { StyleSheet, View } from 'react-native'
import { colors, dimensions } from '@app/theme'

import DateUtils from '@app/utils/DateUtils'
import FormSupport from './components/FormSupport'
import RNImageViewer from '@app/components/RNMediaViewer'
import React from 'react'
import RowDetail from './components/RowDetail'

const BodyDetail = ({ data }: { data?: dataSupportDetail }) => {
  const listVideo = data?.DonateImages.filter(item => item?.type === 2)
  const listImage: any = data?.DonateImages.filter(item => item?.type === 1)
  console.log(listImage)
  return (
    <View style={stylesBody.ctn_default}>
      <View style={stylesBody.ctn}>
        {data?.end_date && (
          <RowDetail
            name={'Ngày thực hiện'}
            value={DateUtils.formatShortDate(data?.end_date)}
          />
        )}
        <RowDetail name={'Người ủng hộ'} value={data?.name} />
        <RowDetail name={'Số điện thoại'} value={data?.phone} />
        {data?.note && <RowDetail name={'Nội dung'} value={data?.note} />}
        <FormSupport data={data} />
        {/* {listImage?.length !== 0 && <ListImage data={data} />} */}
        {listImage?.length !== 0 && (
          <RNImageViewer
            data={listImage}
            title={'Hình ảnh thực tế'}
            styleImage={{
              width: (dimensions.width - 70) / 4,
              height: (dimensions.width - 70) / 4,
            }}
          />
        )}
        {listImage?.length !== 0 && (
          <RNImageViewer
            data={listVideo}
            title={'Video thực tế'}
            videoStyle={{
              width: dimensions.width - 46,
              height: dimensions.width - 46,
            }}
          />
        )}
        {/* {listVideo?.length !== 0 && <VideoComponent data={data} />} */}
      </View>
    </View>
  )
}

export default BodyDetail

const stylesBody = StyleSheet.create({
  ctn_default: {
    backgroundColor: colors.white,
    paddingHorizontal: 8,
  },
  ctn: {
    borderWidth: 1,
    padding: 15,
    borderRadius: 12,
    borderColor: colors.border,
    paddingBottom: 20,
  },
})
