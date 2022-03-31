import { StyleSheet, Text, View } from 'react-native'
import { colors, dimensions, fonts, styleView } from '@app/theme'

import RNImageViewer from '@app/components/RNMediaViewer'
import React from 'react'

const AfterUpdate = ({ data }: { data: dataSupportDetail }) => {
  const listImage = data?.DonateImages.filter(item => item?.type === 1).slice(
    0,
    4
  )
  const listVideo = data?.DonateImages.filter(item => item?.type === 2)
  return (
    <View style={styles.ctn}>
      <View>
        <Text style={styles.txt_title} children={data?.title} />
        <Text style={styles.content} children={data?.content} />
      </View>
      {listImage.length !== 0 && (
        <RNImageViewer data={listImage} title={'Hình ảnh thực tế'} />
      )}
      {/* {listImage.length !== 0 && (
        <View style={styles.ctn_v_img}>
          <Text
            style={{ ...fonts.regular15, color: colors.textColor.gray8 }}
            children={'Hình ảnh thực tế'}
          />
          <View style={styles.list_img}>
            {listImage.map((item: any, index: number) => {
              return (
                <FstImage
                  source={{ uri: item?.media_url }}
                  key={`${index}`}
                  style={styles.img_update}
                />
              )
            })}
          </View>
        </View>
      )} */}
      {/* {listVideo.length !== 0 && (
        <View style={styles.ctn_v_img}>
          <Text
            style={{ ...fonts.regular15, color: colors.textColor.gray8 }}
            children={'Video thực tế'}
          />
          <Video
            paused={true}
            source={{
              uri: 'http://dev.ndsapi.winds.vn/uploads/video/video_08ff608fdc3c4fbf9b6ad8eb9aff28bb.mp4',
            }}
            style={{
              width: (dimensions.width - 105) / 4,
              height: (dimensions.width - 105) / 4,
              marginTop: 15,
            }}
          />
          <View style={styles.video}>
            <FstImage source={R.images.ic_play} style={styles.ic_play} />
          </View>
        </View>
      )} */}
      {listVideo.length !== 0 && (
        <RNImageViewer data={listVideo} title={'Video thực té'} />
      )}
    </View>
  )
}

export default AfterUpdate

const styles = StyleSheet.create({
  ctn: {
    borderWidth: 1,
    marginTop: 15,
    padding: 15,
    borderRadius: 12,
    borderColor: colors.border,
  },
  txt_title: { ...fonts.semi_bold16, color: colors.textColor.gray9 },
  content: {
    marginTop: 15,
    ...fonts.regular16,
    color: colors.textColor.gray9,
  },
  ctn_v_img: { marginTop: 15 },
  list_img: { ...styleView.rowItem, marginTop: 15 },
  img_update: {
    width: (dimensions.width - 78) / 4,
    height: (dimensions.width - 78) / 4,
    borderRadius: 8,
    marginRight: 6,
  },
  video: {
    backgroundColor: 'black',
    width: (dimensions.width - 78) / 4,
    height: (dimensions.width - 78) / 4,
    borderRadius: 8,
    marginRight: 6,
    marginTop: 15,
  },
  ic_play: {
    width: 25,
    height: 25,
    marginTop: (dimensions.width - 78) / 12,
    marginLeft: (dimensions.width - 78) / 12,
  },
})
