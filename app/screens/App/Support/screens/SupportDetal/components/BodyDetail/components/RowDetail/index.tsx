import { StyleSheet, Text, View } from 'react-native'
import { colors, fonts, styleView } from '@app/theme'

import React from 'react'

const RowDetail = ({ name, value }: { name: string; value: string }) => {
  return (
    <View style={styles.ctn_row}>
      <Text style={styles.txt_name} children={name} />
      <Text style={styles.txt_value} children={value} />
    </View>
  )
}
export default RowDetail
const styles = StyleSheet.create({
  ctn_row: {
    ...styleView.rowItemBetween,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  txt_name: {
    flex: 1,
    lineHeight: 22,
    ...fonts.regular15,
    color: colors.textColor.gray8,
  },
  txt_value: {
    flex: 2,
    lineHeight: 22,
    ...fonts.regular15,
    color: colors.textColor.gray9,
    textAlign: 'right',
  },
})
