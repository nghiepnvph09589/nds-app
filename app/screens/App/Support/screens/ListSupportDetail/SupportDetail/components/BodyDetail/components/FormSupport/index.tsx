import { StyleSheet, Text, View } from 'react-native'
import { colors, fonts } from '@app/theme'

import React from 'react'

const FormSupport = ({ data }: { data?: dataSupportDetail }) => {
  return (
    <View style={styles.ctn}>
      <Text style={styles.title} children={'Hình thức ủng hộ'} />
      <View style={styles.form}>
        {data?.form_support.map((item: { name: string }, index: number) => {
          return (
            <View key={`${index}`} style={styles.item}>
              <Text style={styles.txt_item} children={item?.name} />
            </View>
          )
        })}
      </View>
    </View>
  )
}

export default FormSupport

const styles = StyleSheet.create({
  ctn: {
    marginTop: 17,
  },
  title: {
    ...fonts.regular15,
    color: colors.textColor.gray8,
  },
  txt_item: {
    ...fonts.regular16,
    color: colors.textColor.gray8,
  },
  form: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    marginTop: 15,
    marginRight: 20,
    borderWidth: 1,
    borderRadius: 17,
    paddingHorizontal: 13,
    paddingVertical: 6,
    borderColor: colors.border,
  },
})
