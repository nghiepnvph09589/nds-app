import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors, fonts } from '@app/theme'

import FstImage from '@app/components/FstImage'
import NavigationUtil from '@app/navigation/NavigationUtil'
import R from '@app/assets/R'
import React from 'react'
import { SCREEN_ROUTER_APP } from '@app/constant/Constant'

const ListSupport = ({ id }: { id: number }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        NavigationUtil.navigate(SCREEN_ROUTER_APP.LIST_SUPPORT_DETAIL, {
          id: id,
        })
      }}
      style={styles.v_container}
    >
      <View style={styles.v_row1}>
        <FstImage style={styles.ic_heart} source={R.images.ic_heart2} />
        <View style={styles.v_column}>
          <Text style={styles.txt_list}>Danh sách ủng hộ</Text>
          <Text style={styles.text}>Lượt ủng hộ 3</Text>
        </View>
        <FstImage style={styles.ic_right} source={R.images.ic_arrow_right} />
      </View>
      <View style={styles.line} />
      <View style={styles.v_row}>
        <Text style={styles.text}>Số tiền</Text>
        <Text style={{ ...fonts.semi_bold16, color: colors.primary }}>
          3.000.000
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default ListSupport

const styles = StyleSheet.create({
  v_container: {
    marginHorizontal: 15,
    marginTop: 16,
    borderRadius: 16,
    borderColor: colors.border,
    borderWidth: 1,
    paddingVertical: 16,
  },
  line: {
    backgroundColor: colors.border,
    height: 1,
    marginTop: 12,
  },
  v_row1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  v_row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 15,
  },
  ic_heart: {
    width: 32,
    height: 32,
  },
  v_column: {
    marginLeft: 18,
    flex: 1,
  },
  txt_list: {
    ...fonts.semi_bold16,
    color: colors.text,
    marginBottom: 8,
  },
  text: {
    ...fonts.regular16,
    color: colors.text,
    flex: 1,
  },
  ic_right: {
    width: 24,
    height: 24,
  },
})
