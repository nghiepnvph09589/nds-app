import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  StatusBar,
  StyleProp,
  Platform,
  ViewStyle,
} from 'react-native'
import { Header } from 'react-native-elements'
import NavigationUtil from '../navigation/NavigationUtil'
import * as theme from '@app/theme'
import R from '@app/assets/R'
import FastImage from 'react-native-fast-image'
import { colors } from '../theme'
import { getStatusBarHeight, isIphoneX } from 'react-native-iphone-x-helper'
interface Props {
  color?: string
  backgroundHeader?: string
  borderBottomHeader?: string
  back?: boolean
  isLeft?: boolean
  /**
   * View nút phải
   */
  rightComponent?: React.ReactNode
  /**
   * View nút trái
   */
  leftComponent?: React.ReactNode
  centerComponent?: React.ReactNode

  /**
   * Title thanh header
   */
  titleHeader: string
  numberLine?: number
}
interface BackProps {
  style?: ViewStyle
  isWhiteBackground?: boolean
}
export class BackButton extends Component<BackProps> {
  render() {
    const { style } = this.props
    return (
      <TouchableOpacity
        style={[style || styles.leftComp]}
        onPress={NavigationUtil.goBack}
      >
        <FastImage
          source={R.images.ic_back}
          style={{ marginLeft: 10, width: 24, height: 24 }}
          tintColor={theme.colors.black}
          resizeMode="contain"
        />
      </TouchableOpacity>
    )
  }
}

export default class RNHeader extends Component<Props> {
  render() {
    const {
      color,
      numberLine,
      back,
      titleHeader,
      rightComponent,
      leftComponent,
      centerComponent,
      borderBottomHeader,
      backgroundHeader,
    } = this.props
    return (
      <Header
        placement="center"
        containerStyle={{
          backgroundColor: backgroundHeader || theme.colors.primary,
          borderBottomColor: borderBottomHeader || theme.colors.primary,
          height:
            Platform.OS !== 'ios'
              ? undefined
              : numberLine == 2
              ? getStatusBarHeight() + (!isIphoneX() ? 65 : 85)
              : getStatusBarHeight() + (!isIphoneX() ? 45 : 65),
          // height: numberLine == 2 ? 110 : 0,
        }}
        leftComponent={
          <>{back ? <BackButton /> : leftComponent ? leftComponent : null}</>
        }
        centerComponent={
          <Text
            style={[
              {
                fontSize: 18,
                fontFamily: R.fonts.san_semi_bold,
              },
              { color: color || 'white' },
            ]}
          >
            {titleHeader}
          </Text>
        }
        rightComponent={rightComponent}
        statusBarProps={{
          //barStyle: 'light-content',
          translucent: true,
          // backgroundColor: 'blue',
        }}
      />
    )
  }
}

const styles = StyleSheet.create({
  leftComp: {
    marginTop: -17,
    // height: '100%',
    // backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 50,
    paddingTop: 20,
    paddingBottom: 10,
    //marginLeft: 20,
    width: 30,
  },
  rightComp: {
    //height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
})
