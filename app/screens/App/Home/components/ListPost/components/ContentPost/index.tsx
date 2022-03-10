import R from '@app/assets/R'
import { colors, fonts } from '@app/theme'
import React, { useCallback, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const NUM_OF_LINES = 4

interface ContentPostProps {
  content: string
}

const ContentPost = (props: ContentPostProps) => {
  const { content } = props
  const [showMoreButton, setShowMoreButton] = useState<boolean>(false)
  const [numberOfLines, setNumberOfLines] =
    useState<number | undefined>(undefined)

  const onTextLayout = useCallback(e => {
    console.log(e.nativeEvent.lines.length)
    if (e.nativeEvent.lines.length > NUM_OF_LINES) {
      setNumberOfLines(NUM_OF_LINES)
      setShowMoreButton(true)
    }
  }, [])

  return (
    <View style={styles.v_post}>
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
    </View>
  )
}

export default ContentPost

const styles = StyleSheet.create({
  v_post: { marginTop: 8 },
  text: {
    ...fonts.regular16,
    color: colors.text,
  },
  see_more: {
    ...fonts.regular16,
    color: '#8C8C8C',
  },
})
