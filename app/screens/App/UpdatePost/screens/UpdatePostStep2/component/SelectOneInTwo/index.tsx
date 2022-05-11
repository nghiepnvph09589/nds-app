import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors, dimensions, fonts, styleView } from '@app/theme'

import FstImage from '@app/components/FstImage'
import R from '@app/assets/R'
import React from 'react'

const SelectOneInTwo = ({
  data,
  value,
  onSelect,
}: {
  data: { id: number; name: string }[]
  value: number
  onSelect: (id: number) => void
}) => {
  return (
    <View style={stylesOr.ctn}>
      {data.map((item: { id: number; name: string }) => {
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
            <Text style={stylesOr.txt} children={item?.name} />
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
    flexWrap: 'wrap',
  },
  btn_select: {
    flexDirection: 'row',
    borderWidth: 1,
    width: (dimensions.width - 45) / 2,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 13,
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 17,
  },
  ic: {
    width: 24,
    height: 24,
  },
  txt: {
    marginLeft: 10,
    ...fonts.regular16,
    flex: 1,
  },
})
