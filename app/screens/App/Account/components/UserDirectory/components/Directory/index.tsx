import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import { colors, fonts } from '@app/theme'

import FstImage from '@app/components/FstImage'
import R from '@app/assets/R'
import React from 'react'
import { Source } from 'react-native-fast-image'

interface DirectoryProps {
  label1: string
  label2: string
  label3?: string
  source1: number | Source
  source2: number | Source
  source3?: number | Source
  onPress1: () => void
  onPress2: () => void
  onPress3?: () => void
  countPost?: number
  countDonate?: number
  style?: StyleProp<ViewStyle>
}

const Directory = (props: DirectoryProps) => {
  const {
    label1,
    label2,
    label3,
    source1,
    source2,
    source3,
    onPress1,
    onPress2,
    onPress3,
    countPost,
    countDonate,
    style,
  } = props
  return (
    <View style={[styles.v_container, style]}>
      <ViewRow
        count={countPost}
        onPress={onPress1}
        label={label1}
        source={source1}
      />
      <ViewRow
        count={countDonate}
        onPress={onPress2}
        label={label2}
        source={source2}
        style={styles.v_row2}
      />
      {source3 && label3 && (
        <ViewRow
          onPress={onPress3}
          label={label3}
          source={source3}
          style={styles.v_row2}
        />
      )}
    </View>
  )
}

const ViewRow = ({
  style,
  label,
  source,
  onPress,
  count,
}: {
  style?: StyleProp<ViewStyle>
  label: string
  source: number | Source
  onPress?: () => void
  count?: number
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.v_row, style]}>
      <FstImage resizeMode="contain" style={styles.icon} source={source} />
      <Text style={styles.text}>{label}</Text>
      {!!count && count !== 0 && (
        <View style={styles.v_count}>
          <Text style={styles.count}>{count}</Text>
        </View>
      )}

      <FstImage
        resizeMode="contain"
        style={styles.icon_arrow}
        source={R.images.ic_arrow_right}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  v_container: {
    backgroundColor: 'white',
    paddingVertical: 23,
    paddingHorizontal: 18,
    borderRadius: 5,
    marginBottom: 8,
  },
  v_row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
  },
  text: {
    flex: 1,
    marginLeft: 16,
    ...fonts.regular16,
    color: colors.text,
  },
  icon_arrow: {
    width: 24,
    height: 24,
  },
  v_row2: {
    marginTop: 24,
  },
  v_count: {
    backgroundColor: 'red',
    width: 20,
    height: 20,
    borderRadius: 18 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  count: {
    ...fonts.semi_bold12,
    color: 'white',
  },
})

export default Directory
