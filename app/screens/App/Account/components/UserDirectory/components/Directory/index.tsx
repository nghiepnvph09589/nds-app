import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native'
import React from 'react'
import FstImage from '@app/components/FstImage'
import R from '@app/assets/R'
import { colors, fonts } from '@app/theme'
import { Source } from 'react-native-fast-image'

interface DirectoryProps {
  label1: string
  label2: string
  source1: number | Source
  source2: number | Source
  onPress1: () => void
  onPress2: () => void
  style?: StyleProp<ViewStyle>
}

const Directory = (props: DirectoryProps) => {
  const { label1, label2, source1, source2, onPress1, onPress2, style } = props
  return (
    <View style={[styles.v_container, style]}>
      <ViewRow onPress={onPress1} label={label1} source={source1} />
      <ViewRow
        onPress={onPress2}
        label={label2}
        source={source2}
        style={styles.v_row2}
      />
    </View>
  )
}

const ViewRow = ({
  style,
  label,
  source,
  onPress,
}: {
  style?: StyleProp<ViewStyle>
  label: string
  source: number | Source
  onPress: () => void
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.v_row, style]}>
      <FstImage resizeMode="contain" style={styles.icon} source={source} />
      <Text style={styles.text}>{label}</Text>
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
})

export default Directory