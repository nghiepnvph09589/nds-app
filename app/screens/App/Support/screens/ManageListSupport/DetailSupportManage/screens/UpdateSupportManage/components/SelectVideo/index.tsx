import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors, dimensions, fonts, styleView } from '@app/theme'

import FstImage from '@app/components/FstImage'
import R from '@app/assets/R'
import React from 'react'
import Video from 'react-native-video'

const SelectVideo = ({
  video,
  onDelete,
  selectVideo,
}: {
  video: any
  onDelete: () => void
  selectVideo: () => void
}) => {
  return (
    <View style={styles.ctn}>
      <Text style={styles.title} children={'Video thực tế'} />
      <View style={styles.v_list_img}>
        {!!video && (
          <View style={styles.ctn_img}>
            <Video
              paused={true}
              source={{ uri: video?.uri }}
              style={[styles.img_support, { backgroundColor: colors.border }]}
            />
            <TouchableOpacity onPress={onDelete} style={styles.btn_delete_img}>
              <FstImage style={styles.ic_delete} source={R.images.ic_exit} />
            </TouchableOpacity>
          </View>
        )}
        {video === '' && (
          <TouchableOpacity onPress={selectVideo} style={styles.btn_upload_img}>
            <FstImage
              source={R.images.img_border_upload}
              style={styles.img_upload_img}
            />
            <View style={styles.v_upload}>
              <FstImage
                source={R.images.ic_upload_img}
                style={styles.ic_upload_img}
              />
              <Text style={styles.txt_upload} children={'Tải Video'} />
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default SelectVideo

const styles = StyleSheet.create({
  ctn: {
    paddingHorizontal: 15,
  },
  title: {
    ...fonts.regular15,
    color: colors.textColor.gray8,
    marginTop: 15,
  },
  v_list_img: {
    ...styleView.rowItem,
    marginTop: 15,
  },
  ctn_img: {
    marginRight: 15,
  },
  btn_delete_img: {
    position: 'absolute',
    backgroundColor: colors.placeHolder,
    borderRadius: 12,
    top: -10,
    right: -10,
  },
  ic_delete: {
    width: 25,
    height: 25,
  },
  btn_upload_img: {
    alignSelf: 'flex-start',
  },
  img_support: {
    width: (dimensions.width - 75) / 4,
    height: (dimensions.width - 75) / 4,
    borderRadius: 8,
  },
  img_upload_img: {
    width: (dimensions.width - 75) / 4,
    height: (dimensions.width - 75) / 4,
  },
  v_upload: {
    alignItems: 'center',
    position: 'absolute',
    top: 10,
    width: (dimensions.width - 75) / 4,
  },
  ic_upload_img: {
    width: 37,
    height: 37,
  },
  txt_upload: {
    ...fonts.regular15,
    color: colors.textColor.gray8,
    marginTop: 5,
  },
})
