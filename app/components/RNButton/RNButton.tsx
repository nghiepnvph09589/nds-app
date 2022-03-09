import R from '@app/assets/R'
import * as theme from '@app/theme'
import { colors, fonts } from '@app/theme'
import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
  View,
  StyleProp,
  TextStyle,
} from 'react-native'
import { Header } from 'react-native-elements'
import FastImage from 'react-native-fast-image'
import NavigationUtil from '../../navigation/NavigationUtil'
import FstImage from '../FstImage'

interface Props {
  color?: string
  title: string
  onPress: () => void
  style?: StyleProp<TextStyle>
  icon?: boolean
}

export default class RNButton extends Component<Props> {
  render() {
    const { title, onPress, style, icon } = this.props
    return (
      <TouchableOpacity
        onPress={onPress}
        children={
          <View style={[styles.v_container, style]}>
            <Text style={styles.text} children={title} />
            {icon && (
              <FstImage
                style={styles.icon}
                source={R.images.ic_arrow_right_circle}
              />
            )}
          </View>
        }
      />
    )
  }
}

const styles = StyleSheet.create({
  v_container: {
    borderRadius: 16,
    backgroundColor: colors.primary,
    paddingVertical: 13,
  },
  text: {
    ...fonts.semi_bold16,
    color: 'white',
    alignSelf: 'center',
    flex: 1,
  },
  icon: {
    width: 24,
    height: 24,
    position: 'absolute',
    top: -22,
    right: 27,
  },
})
