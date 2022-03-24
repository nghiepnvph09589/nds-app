import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors, fonts } from '@app/theme'

interface ContentProps {
  title: string
  content: string
}

const Content = (props: ContentProps) => {
  const { title, content } = props
  return (
    <View style={styles.v_contain}>
      <Text style={styles.txt_title}>{title}</Text>
      <Text style={styles.text}>{content}</Text>
    </View>
  )
}

export default Content

const styles = StyleSheet.create({
  v_contain: {
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  txt_title: {
    ...fonts.semi_bold16,
    textAlign: 'justify',
    color: colors.text,
  },
  text: {
    ...fonts.regular16,
    marginTop: 12,
    textAlign: 'justify',
    color: colors.text,
  },
})
