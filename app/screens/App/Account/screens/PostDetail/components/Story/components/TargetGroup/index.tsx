import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors, fonts } from '@app/theme'
import { DonateCategoryDetails } from '../../../../model'

interface TargetGroupProps {
  data: DonateCategoryDetails[]
}

const TargetGroup = (props: TargetGroupProps) => {
  const { data } = props
  return (
    <View style={styles.v_container}>
      <Text style={styles.txt_label}>Nhóm đối tượng</Text>
      <View style={styles.v_row}>
        {data?.map((item: DonateCategoryDetails) => {
          return (
            <View style={styles.v_item}>
              <Text style={styles.txt_item}>{item.category_name}</Text>
            </View>
          )
        })}
      </View>
    </View>
  )
}

export default TargetGroup

const styles = StyleSheet.create({
  v_container: {
    marginHorizontal: 15,
  },
  txt_label: {
    ...fonts.semi_bold16,
    color: colors.text,
  },
  v_row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  v_item: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 12,
    marginBottom: 16,
  },
  txt_item: {
    ...fonts.regular16,
    color: '#595959',
  },
})
