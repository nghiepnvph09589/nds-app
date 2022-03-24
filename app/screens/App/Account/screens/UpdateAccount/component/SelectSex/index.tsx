/* eslint-disable prettier/prettier */
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors, dimensions, fonts, styleView } from '@app/theme'

import FstImage from '@app/components/FstImage'
import R from '@app/assets/R'
import React from 'react'

const SelectSex = ({
  value,
  onSelect,
}: {
  value: number
  onSelect: (id: any) => void
}) => {
  const sexSelect = [
    {
      id: 1,
      sex: 'Nam',
    },
    {
      id: 2,
      sex: 'Nữ',
    },
  ]
  return (
    <View style={styles.ctn}>
      {sexSelect.map(item => {
        return (
          <TouchableOpacity
            style={styles.btn_select}
            onPress={() => {
              onSelect(item.id.toString())
            }}
          >
            <FstImage
              source={
                Number(value) === item?.id
                  ? R.images.ic_ticked
                  : R.images.ic_unticked
              }
              style={styles.ic}
            />
            <Text style={styles.txt} children={item?.sex} />
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

export default SelectSex
const styles = StyleSheet.create({
  ctn: {
    ...styleView.rowItemBetween,
    marginTop: 27,
  },
  btn_select: {
    ...styleView.rowItem,
    borderWidth: 1.5,
    width: dimensions.width * 0.41,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 13,
    alignItems: 'center',
    borderColor: colors.border,
  },
  ic: {
    width: 25,
    height: 25,
  },
  txt: {
    marginLeft: 10,
    ...fonts.regular16,
    color: colors.text,
  },
})
