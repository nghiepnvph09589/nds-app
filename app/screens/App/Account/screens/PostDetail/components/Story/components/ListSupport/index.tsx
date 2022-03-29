import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors, fonts } from '@app/theme'

import FstImage from '@app/components/FstImage'
import NavigationUtil from '@app/navigation/NavigationUtil'
import R from '@app/assets/R'
import React from 'react'
import { SCREEN_ROUTER_APP } from '@app/constant/Constant'

const ListSupport = ({ id, count }: { id: number; count: number }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        NavigationUtil.navigate(SCREEN_ROUTER_APP.LIST_SUPPORT_DETAIL, {
          id: id,
        })
      }}
      style={styles.v_container}
    >
      <FstImage style={styles.ic_heart} source={R.images.ic_heart2} />

      <Text style={styles.text}>{`Lượt ủng hộ ${count}`}</Text>

      <FstImage style={styles.ic_right} source={R.images.ic_arrow_right} />
    </TouchableOpacity>
  )
}

export default ListSupport

const styles = StyleSheet.create({
  v_container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 15,
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
    marginLeft: 12,
  },
  ic_right: {
    width: 24,
    height: 24,
  },
})
