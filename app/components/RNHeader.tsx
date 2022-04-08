/* eslint-disable react-native/no-inline-styles */
import R from '@app/assets/R'
import * as theme from '@app/theme'
import { fonts } from '@app/theme'
import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'
import { Header } from 'react-native-elements'
import FastImage from 'react-native-fast-image'
import NavigationUtil from '../navigation/NavigationUtil'

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
  onPress?: () => void
}
interface BackProps {
  style?: ViewStyle
  isWhiteBackground?: boolean
  onPress?: () => void
}
export class BackButton extends Component<BackProps> {
  render() {
    const { style, onPress } = this.props
    return (
      <TouchableOpacity
        style={[style || styles.leftComp]}
        onPress={onPress ? onPress : NavigationUtil.goBack}
      >
        <FastImage
          source={R.images.ic_back}
          style={{ width: 24, height: 24 }}
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
      borderBottomHeader,
      backgroundHeader,
      onPress,
    } = this.props
    return (
      <Header
        placement="center"
        containerStyle={{
          backgroundColor: backgroundHeader || theme.colors.primary,
          borderBottomColor: borderBottomHeader || theme.colors.primary,
          // height:
          //   Platform.OS !== 'ios'
          //     ? undefined
          //     : numberLine === 2
          //     ? getStatusBarHeight() + (!isIphoneX() ? 65 : 85)
          //     : getStatusBarHeight() + (!isIphoneX() ? 65 : 65),
        }}
        leftComponent={
          <>
            {back ? (
              <BackButton onPress={onPress} />
            ) : leftComponent ? (
              leftComponent
            ) : null}
          </>
        }
        centerComponent={
          <Text
            style={[
              {
                ...fonts.semi_bold18,
                textAlign: 'center',
              },
              { color: color || 'white' },
            ]}
          >
            {titleHeader}
          </Text>
        }
        rightComponent={rightComponent}
        statusBarProps={{
          barStyle: 'dark-content',
          translucent: true,
          backgroundColor: 'transparent',
          // barStyle: 'light-content',
          // translucent: true,
          // // backgroundColor: 'blue',
        }}
      />
    )
  }
}

const styles = StyleSheet.create({
  leftComp: {
    marginTop: Platform.OS !== 'ios' ? -15 : -20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 5,
    paddingRight: 50,
    paddingTop: 20,
    paddingBottom: 10,
    width: 30,
  },
  rightComp: {
    //height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
})
