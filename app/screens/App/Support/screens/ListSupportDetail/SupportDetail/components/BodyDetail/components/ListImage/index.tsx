import { StyleSheet, Text, View } from 'react-native'
import { colors, dimensions, fonts, styleView } from '@app/theme'

import FstImage from '@app/components/FstImage'
import React from 'react'

const ListImage = ({ data }: { data: any }) => {
  return (
    <View style={styles.ctn}>
      <Text style={styles.title} children={'Hình ảnh thực tế'} />
      <View style={styles.v_image}>
        {data?.list_image.map((item: any, index: number) => {
          return (
            <FstImage
              key={`${index}`}
              source={{ uri: item?.url }}
              style={{
                width: (dimensions.width - 70) / 4,
                height: (dimensions.width - 70) / 4,
              }}
            />
          )
        })}
      </View>
    </View>
  )
}
export default ListImage
const styles = StyleSheet.create({
  ctn: {
    marginTop: 17,
  },
  title: {
    ...fonts.regular15,
    color: colors.textColor.gray8,
  },
  v_image: {
    ...styleView.rowItemBetween,
    marginTop: 17,
  },
})
