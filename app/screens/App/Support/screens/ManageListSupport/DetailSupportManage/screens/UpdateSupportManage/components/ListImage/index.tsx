import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { colors, dimensions, fonts, styleView } from '@app/theme'

import FstImage from '@app/components/FstImage'
import R from '@app/assets/R'
import React from 'react'

const ListImage = ({
  listImage,
  deleteImage,
  selectImage,
  loading,
}: {
  listImage: any[]
  deleteImage: (index: number) => void
  selectImage: () => void
  loading?: boolean
}) => {
  return (
    <View style={styles.ctn}>
      <Text style={styles.title} children={'Hình ảnh thực tế'} />
      <View style={styles.v_list_img}>
        {listImage.map((item: any, index: number) => {
          return (
            <View
              style={[
                styles.ctn_img,
                {
                  marginLeft: index === 0 || index === 4 || index == 8 ? 0 : 15,
                },
              ]}
            >
              <FstImage
                source={{ uri: item?.uri }}
                style={styles.img_support}
              />
              <TouchableOpacity
                onPress={() => {
                  deleteImage(index)
                }}
                style={styles.btn_delete_img}
              >
                <FstImage style={styles.ic_delete} source={R.images.ic_exit} />
              </TouchableOpacity>
            </View>
          )
        })}
        {listImage.length < 10 && (
          <TouchableOpacity onPress={selectImage} style={styles.btn_upload_img}>
            <FstImage
              source={R.images.img_border_upload}
              style={styles.img_upload_img}
            />
            <View style={styles.v_upload}>
              {loading ? (
                <ActivityIndicator
                  color={colors.primary}
                  style={{ marginTop: 5 }}
                />
              ) : (
                <>
                  <FstImage
                    source={R.images.ic_upload_img}
                    style={styles.ic_upload_img}
                  />
                  <Text style={styles.txt_upload} children={'Tải ảnh'} />
                </>
              )}
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default ListImage

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
    flexWrap: 'wrap',
    width: dimensions.width - 30,
  },
  ctn_img: {
    width: (dimensions.width - 75) / 4,
    height: (dimensions.width - 75) / 4,
    borderRadius: 8,
    marginTop: 15,
  },
  img_support: {
    width: (dimensions.width - 75) / 4,
    height: (dimensions.width - 75) / 4,
    borderRadius: 8,
  },
  btn_delete_img: {
    position: 'absolute',
    backgroundColor: colors.placeHolder,
    borderRadius: 12,
    top: -7,
    right: -7,
  },
  ic_delete: {
    width: 25,
    height: 25,
  },
  btn_upload_img: {
    marginTop: 15,
    alignSelf: 'flex-start',
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
