import { StyleSheet, Text, View } from 'react-native'
import { colors, dimensions, fonts } from '@app/theme'

import React from 'react'
import RowDetail from '../RowDetail'

const mockData = [
  {
    id: 1,
    name: 'Lương thực, thực phẩm',
  },
  {
    id: 1,
    name: 'Sinh kế',
  },
  {
    id: 1,
    name: 'Sinh kế',
  },
  {
    id: 1,
    name: 'Lương thực, thực phẩm',
  },
]
const CharityHouse = () => {
  return (
    <View style={charityHouseStyle.ctn}>
      <Text style={charityHouseStyle.txt_name_v} children={'Nhà hảo tâm'} />
      <RowDetail name={'Ngày thực hiện'} value={'23/03/2022'} />
      <RowDetail name={'Họ tên'} value={'Trần Dần'} />
      <RowDetail name={'Số điện thoại'} value={'0231239412'} />
      <RowDetail name={'Nội dung'} value={'Mong các cháu chăm chỉ học hành'} />
      <View style={charityHouseStyle.ctn_list}>
        <Text
          style={charityHouseStyle.txt_form_support}
          children={'Hình thức ủng hộ'}
        />
        <View style={charityHouseStyle.v_list}>
          {mockData.map((item: any, index: number) => {
            return (
              <View key={`${index}`} style={charityHouseStyle.item}>
                <Text
                  style={charityHouseStyle.txt_item}
                  children={item?.name}
                />
              </View>
            )
          })}
        </View>
      </View>
    </View>
  )
}

const charityHouseStyle = StyleSheet.create({
  ctn: {
    borderWidth: 1,
    alignItems: 'center',
    marginTop: 15,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 13,
  },
  txt_name_v: {
    ...fonts.semi_bold16,
    color: colors.textColor.gray10,
    marginVertical: 5,
  },
  ctn_list: {
    width: dimensions.width - 60,
    marginTop: 20,
  },
  txt_form_support: {
    ...fonts.regular15,
    color: colors.textColor.gray8,
    marginBottom: 10,
  },
  v_list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    borderWidth: 1,
    marginTop: 10,
    marginRight: 15,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderColor: colors.border,
  },
  txt_item: {
    ...fonts.regular16,
    color: colors.textColor.gray8,
  },
})
export default CharityHouse
