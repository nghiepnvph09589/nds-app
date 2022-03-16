import NavigationUtil from '@app/navigation/NavigationUtil'
import { colors, fonts } from '@app/theme'
import React from 'react'
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

const { width } = Dimensions.get('window')

interface ViewBottomProps {
  onBack: () => void
  onNext: () => void
}

const ViewBottom = (props: ViewBottomProps) => {
  const { onBack, onNext } = props
  return (
    <View style={styles.v_container}>
      <TouchableOpacity style={styles.v_back} onPress={onBack}>
        <Text style={styles.txt_back}>Quay lại</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.v_next} onPress={onNext}>
        <Text style={styles.txt_next}>Tiếp theo</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ViewBottom

const styles = StyleSheet.create({
  v_container: {
    backgroundColor: 'white',
    paddingTop: 8,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  v_back: {
    width: (width - 35) / 2,
    alignItems: 'center',
    paddingVertical: 11,
  },
  txt_back: {
    ...fonts.regular16,
    color: '#262626',
  },
  v_next: {
    marginLeft: 5,
    backgroundColor: colors.primary,
    borderRadius: 12,
    width: (width - 35) / 2,
    alignItems: 'center',
    paddingVertical: 11,
  },
  txt_next: {
    ...fonts.regular16,
    color: 'white',
  },
})
