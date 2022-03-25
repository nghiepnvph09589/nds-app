import { StyleSheet, Text, View } from 'react-native'
import { colors, fonts } from '@app/theme'

import React from 'react'

const ContentDetail = ({ data }: { data: any }) => {
  return (
    <View style={styles.head}>
      <Text style={styles.txt_title} children={data?.title} />
      <Text style={styles.txt_content} children={data?.content} />
    </View>
  )
}

export default ContentDetail

const styles = StyleSheet.create({
  head: {
    padding: 15,
  },
  txt_title: {
    lineHeight: 24,
    ...fonts.semi_bold16,
    color: colors.textColor.gray9,
  },
  txt_content: {
    marginTop: 17,
    lineHeight: 24,
    color: colors.textColor.gray9,
    ...fonts.regular16,
  },
})
