import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors, dimensions, fonts, styleView } from '@app/theme'

import FstImage from '@app/components/FstImage'
import R from '@app/assets/R'
import React from 'react'

const SelectOneInTwo = ({
  data,
  value,
  onSelect,
}: {
  data: { id: number; title: string }[]
  value: number
  onSelect: (id: number) => void
}) => {
  return (
    <View style={stylesOr.ctn}>
      {data.map((item: { id: number; title: string }) => {
        return (
          <TouchableOpacity
            style={[
              stylesOr.btn_select,
              {
                borderColor:
                  Number(value) === item?.id ? colors.primary : colors.border,
              },
            ]}
            onPress={() => {
              onSelect(item.id)
            }}
          >
            <FstImage
              source={
                Number(value) === item?.id
                  ? R.images.ic_ticked
                  : R.images.ic_unticked
              }
              style={stylesOr.ic}
            />
            <Text style={stylesOr.txt} children={item?.title} />
          </TouchableOpacity>
        )
      })}
    </View>
  )
}
export default SelectOneInTwo
const stylesOr = StyleSheet.create({
  ctn: {
    ...styleView.rowItemBetween,
    marginTop: 16,
  },
  btn_select: {
    ...styleView.rowItem,
    borderWidth: 1,
    width: (dimensions.width - 55) / 2,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 15,
    alignItems: 'center',
  },
  ic: {
    width: 25,
    height: 25,
  },
  txt: {
    marginLeft: 10,
    ...fonts.regular16,
  },
})
