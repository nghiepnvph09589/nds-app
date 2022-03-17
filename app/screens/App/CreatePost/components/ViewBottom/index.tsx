import R from '@app/assets/R'
import NavigationUtil from '@app/navigation/NavigationUtil'
import { colors, fonts } from '@app/theme'
import React from 'react'
import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { getBottomSpace, isIphoneX } from 'react-native-iphone-x-helper'

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
        <Text style={styles.txt_back}>{R.strings().back}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.v_next} onPress={onNext}>
        <Text style={styles.txt_next}>{R.strings().next}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ViewBottom

const styles = StyleSheet.create({
  v_container: {
    backgroundColor: 'white',
    paddingTop: 8,
    paddingBottom: Platform.OS !== 'ios' ? 8 : 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,

    elevation: 10,
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
