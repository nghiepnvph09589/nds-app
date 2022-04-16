import { StyleSheet, Text, View } from 'react-native'
import { colors, dimensions, fonts } from '@app/theme'

import DateUtils from '@app/utils/DateUtils'
import React from 'react'
import RowDetail from '../RowDetail'

const CharityHouse = ({ data }: { data?: dataSupportDetail }) => {
  return (
    <View style={charityHouseStyle.ctn}>
      <Text style={charityHouseStyle.txt_name_v} children={'Nhà hảo tâm'} />
      <RowDetail name={'Họ tên'} value={data?.name} />
      <RowDetail name={'Số điện thoại'} value={data?.phone} />
      {data?.end_date && (
        <RowDetail
          name={'Ngày thực hiện'}
          value={DateUtils.formatShortDate(data?.end_date)}
        />
      )}
      {!!data?.note && <RowDetail name={'Nội dung'} value={data?.note} />}
      <View style={charityHouseStyle.ctn_list}>
        <Text
          style={charityHouseStyle.txt_form_support}
          children={'Hình thức ủng hộ'}
        />
        <View style={charityHouseStyle.v_list}>
          {data?.form_support.map(
            (item: { id: number; name: string }, index: number) => {
              return (
                <View key={`${index}`} style={charityHouseStyle.item}>
                  <Text
                    style={charityHouseStyle.txt_item}
                    children={item?.name}
                  />
                </View>
              )
            }
          )}
        </View>
      </View>
    </View>
  )
}

const charityHouseStyle = StyleSheet.create({
  ctn: {
    borderWidth: 1,
    alignItems: 'center',
    marginTop: 20,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 15,
  },
  txt_name_v: {
    ...fonts.semi_bold16,
    color: colors.textColor.gray10,
    marginVertical: 10,
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
    borderColor: '#ADB5BD',
  },
  txt_item: {
    ...fonts.regular16,
    color: colors.textColor.gray8,
  },
})
export default CharityHouse
