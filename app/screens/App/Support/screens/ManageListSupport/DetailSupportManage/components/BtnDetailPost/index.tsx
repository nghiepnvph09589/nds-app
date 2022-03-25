import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors, dimensions, fonts, styleView } from '@app/theme'

import FstImage from '@app/components/FstImage'
import NavigationUtil from '@app/navigation/NavigationUtil'
import R from '@app/assets/R'
import React from 'react'
import { SCREEN_ROUTER_APP } from '@app/constant/Constant'

const BtnDetailPost = ({ data }: { data?: dataSupportDetail }) => {
  return (
    <View style={styles.ctn}>
      <FstImage
        source={{ uri: data?.DonateRequest?.DonateRequestMedia[0]?.media_url }}
        style={styles.img_post}
      />
      <View style={styles.detail_post}>
        <Text
          numberOfLines={2}
          style={styles.txt_title}
          children={data?.DonateRequest?.title}
        />
        <TouchableOpacity
          onPress={() => {
            NavigationUtil.navigate(SCREEN_ROUTER_APP.DETAIL_POST, {
              id: data?.DonateRequest?.id,
            })
          }}
          style={styles.btn}
        >
          <Text style={styles.txt_detail} children={'Chi tiết bài viết'} />
          <FstImage
            source={R.images.ic_arrow_right}
            style={styles.ic_to_right}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}
export default BtnDetailPost

const styles = StyleSheet.create({
  ctn: {
    paddingHorizontal: 15,
    borderWidth: 1,
    borderRadius: 12,
    marginTop: 15,
    paddingVertical: 20,
    borderColor: colors.border,
    ...styleView.rowItem,
  },
  img_post: {
    width: dimensions.width * 0.21,
    height: dimensions.width * 0.21,
    borderRadius: 7,
  },
  detail_post: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'space-between',
  },
  txt_title: {
    color: colors.textColor.gray9,
    ...fonts.semi_bold16,
  },
  btn: {
    ...styleView.rowItem,
    alignItems: 'center',
  },
  txt_detail: {
    flex: 1,
    ...fonts.regular14,
    color: colors.primary,
  },
  ic_to_right: {
    width: 25,
    height: 25,
  },
})
