import {
  Platform,
  NativeModules,
  StatusBar,
  Dimensions,
  PixelRatio,
} from 'react-native'

const { NativeCommonManager } = NativeModules

// kiểm tra xem có phải là iphoneX hay không
export const isIphoneX: () => boolean = () => {
  return Boolean(Platform.OS === 'ios' && NativeCommonManager?.is_iphone_x)
}

const defaultTop: number = isIphoneX() ? 44 : 20

const defaultTopWithoutMarin: number = isIphoneX() ? 34 : 20

const defaultBottomWithoutMargin: number = isIphoneX() ? 24 : 0

const defaultBottom: number = isIphoneX() ? 34 : 0

interface Offset {
  top: number
  top_without_margin: number
  bottom: number
  bottom_without_margin: number
}

const offset: Offset = {
  top:
    Platform.OS === 'android'
      ? StatusBar.currentHeight
      : NativeCommonManager?.top || defaultTop,
  top_without_margin:
    Platform.OS === 'android'
      ? StatusBar.currentHeight ?? defaultTopWithoutMarin
      : NativeCommonManager?.top - (isIphoneX() ? 12 : 0) ||
        defaultTopWithoutMarin,
  bottom: NativeCommonManager?.bottom || defaultBottom,
  bottom_without_margin:
    Platform.OS === 'android'
      ? 0
      : NativeCommonManager?.bottom - (isIphoneX() ? 10 : 0) ??
        defaultBottomWithoutMargin,
}

// func lấy ra khoảng cách safe area view
export const getOffset: () => Offset = () => {
  return offset
}

const { width, height } = Dimensions.get('window')

const SCREEN_WIDTH = width
const SCREEN_HEIGHT = height - getOffset().top - getOffset().bottom

let fixed_width = 375
let fixed_height = 812 - 78

//
export const setDimensions: (w: number, h: number) => void = (w, h) => {
  fixed_width = w
  fixed_height = h
}

// based on iPhoneX's scale
const wscale: number = SCREEN_WIDTH / fixed_width
const hscale: number = SCREEN_HEIGHT / fixed_height

/**
 * func tinh toán lại width theo kich thước của từng device
 * @param size
 */

export const widthLize: (size: number, w?: number) => number = (size, w) => {
  const newSize = size * (w || wscale)
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  }
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
}

/**
 * func tính toán lại height theo kích thước của device
 * @param size
 */
export const heightLize: (size: number, h?: number) => number = (size, h) => {
  const newSize = size * (h || hscale)
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  }
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
}

/**
 * func tinhs toan fontsize theo kích thước của device
 */

export const fontSizeLine: (size: number, w?: number, h?: number) => number = (
  size,
  w,
  h
) => {
  return Math.round(
    (size * (w || wscale)) / (h || hscale) -
      (Platform.OS === 'android' ? 0.5 : 0)
  )
}
