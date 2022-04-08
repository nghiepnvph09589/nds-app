import R from '@app/assets/R'
import { colors, fonts } from '@app/theme'
import React, { Component } from 'react'
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native'
import FstImage from '../FstImage'

interface Props {
  color?: string
  title: string
  onPress: () => void
  style?: StyleProp<TextStyle>
  icon?: boolean
  isLoading?: boolean
}

export default class RNButton extends Component<Props> {
  render() {
    const { title, onPress, style, icon, isLoading } = this.props
    return (
      <TouchableOpacity
        onPress={onPress}
        children={
          <>
            <View style={[styles.v_container, style]}>
              {isLoading && <ActivityIndicator style={styles.loading} />}
              <Text style={styles.text} children={title} />
              {icon && (
                <FstImage
                  style={styles.icon}
                  source={R.images.ic_arrow_right_circle}
                />
              )}
            </View>
          </>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    ...fonts.semi_bold16,
    color: 'white',
    alignSelf: 'center',
    marginRight: 10,
  },
  icon: {
    width: 24,
    height: 24,
    // position: 'absolute',
    // top: -22,
    // right: 27,
  },
  loading: {
    marginRight: 10,
  },
})
