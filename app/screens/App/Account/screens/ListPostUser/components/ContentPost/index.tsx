import R from '@app/assets/R'
import { SCREEN_ROUTER_APP } from '@app/constant/Constant'
import NavigationUtil from '@app/navigation/NavigationUtil'
import { colors, fonts } from '@app/theme'
import React, { useCallback, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const NUM_OF_LINES = 4

interface ContentPostProps {
  content: string
  title: string
  id: number
}

const ContentPost = (props: ContentPostProps) => {
  const { content, title, id } = props
  const [showMoreButton, setShowMoreButton] = useState<boolean>(false)
  const [numberOfLines, setNumberOfLines] =
    useState<number | undefined>(undefined)

  const onTextLayout = useCallback(e => {
    if (e.nativeEvent.lines.length > NUM_OF_LINES) {
      setNumberOfLines(NUM_OF_LINES)
      setShowMoreButton(true)
    }
  }, [])

  return (
    <TouchableOpacity
      onPress={() => {
        NavigationUtil.navigate(SCREEN_ROUTER_APP.DETAIL_POST, { id: id })
      }}
      style={styles.v_post}
    >
      <Text style={styles.txt_title}>{title}</Text>
      <Text
        onTextLayout={onTextLayout}
        numberOfLines={numberOfLines}
        style={styles.text}
      >
        {content}
      </Text>
      {showMoreButton && (
        <TouchableOpacity onPress={() => {}} accessibilityRole="button">
          <Text style={styles.see_more}>{R.strings().see_more}</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  )
}

export default ContentPost

const styles = StyleSheet.create({
  v_post: { marginTop: 8, paddingHorizontal: 15, marginBottom: 8 },
  text: {
    ...fonts.regular16,
    color: colors.text,
    marginTop: 12,
  },
  see_more: {
    ...fonts.regular16,
    color: '#8C8C8C',
  },
  txt_title: {
    ...fonts.semi_bold16,
    color: colors.text,
  },
})
