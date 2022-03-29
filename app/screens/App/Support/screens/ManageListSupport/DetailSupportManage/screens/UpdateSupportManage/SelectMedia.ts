import { NativeModules, Platform } from 'react-native'

import { MEDIA_TYPE } from '@app/constant/Constant'

type Callback = (response: ImagePickerResponse) => any
interface ImagePickerResponse {
  didCancel?: boolean
  errorCode?: ErrorCode
  errorMessage?: string
  assets?: Asset[]
}
interface ImageLibraryOptions {
  selectionLimit?: number
  mediaType: MediaType
  maxWidth?: number
  maxHeight?: number
  quality?: PhotoQuality
  videoQuality?: AndroidVideoOptions | iOSVideoOptions
  includeBase64?: boolean
  includeExtra?: boolean
}
interface CameraOptions extends Omit<ImageLibraryOptions, 'selectionLimit'> {
  durationLimit?: number
  saveToPhotos?: boolean
  cameraType?: CameraType
}
interface Asset {
  base64?: string
  uri?: string
  width?: number
  height?: number
  fileSize?: number
  type?: string
  fileName?: string
  duration?: number
  bitrate?: number
  timestamp?: string
  id?: string
}
interface ImagePickerResponse {
  didCancel?: boolean
  errorCode?: ErrorCode
  errorMessage?: string
  assets?: Asset[]
}
type PhotoQuality = 0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1

type CameraType = 'back' | 'front'
type MediaType = 'photo' | 'video' | 'mixed'
type AndroidVideoOptions = 'low' | 'high'
type iOSVideoOptions = 'low' | 'medium' | 'high'
type ErrorCode = 'camera_unavailable' | 'permission' | 'others'

const DEFAULT_OPTIONS: ImageLibraryOptions & CameraOptions = {
  mediaType: 'photo',
  videoQuality: 'high',
  quality: 1,
  maxWidth: 0,
  maxHeight: 0,
  includeBase64: false,
  cameraType: 'back',
  selectionLimit: 1,
  saveToPhotos: false,
  durationLimit: 0,
  includeExtra: false,
}

export function launchImageLibraryMultiple(
  options: ImageLibraryOptions,
  callback?: Callback
): Promise<ImagePickerResponse> {
  return new Promise(resolve => {
    NativeModules.ImagePickerManager.launchImageLibrary(
      { ...DEFAULT_OPTIONS, ...options },
      (result: any) => {
        if (result.hasOwnProperty('didCancel') && result.didCancel) {
          console.log('User cancelled image picker')
        } else if (
          result.hasOwnProperty('errorMessage') &&
          result.errorMessage
        ) {
          console.log('ImagePicker Error: ', result.errorMessage)
        } else if (result?.assets) {
          let arrayImage = result?.assets?.map((item: any) => {
            return {
              uri:
                Platform.OS === 'android'
                  ? item?.uri
                  : item?.uri.replace('file://', ''),
              type: MEDIA_TYPE.IMAGE,
              name: item?.fileName,
            }
          })
          // reactotron.log(result?.assets)
          if (callback) callback(arrayImage)
          resolve(arrayImage)
        }
      }
    )
  })
}

export function launchImageLibrary(
  options: ImageLibraryOptions,
  callback?: Callback
): Promise<ImagePickerResponse> {
  return new Promise(resolve => {
    NativeModules.ImagePickerManager.launchImageLibrary(
      { ...DEFAULT_OPTIONS, ...options },
      (result: any) => {
        // if (callback) callback(result)
        // resolve(result)
        if (result.hasOwnProperty('didCancel') && result.didCancel) {
          console.log('User cancelled image picker')
        } else if (
          result.hasOwnProperty('errorMessage') &&
          result.errorMessage
        ) {
          console.log('ImagePicker Error: ', result.errorMessage)
        } else if (result?.assets) {
          let firstAsset = result?.assets[0]
          // let uri =
          //   Platform.OS === 'android'
          //     ? firstAsset?.uri
          //     : firstAsset?.uri.replace('file://', '')
          let img: any = {
            uri:
              Platform.OS === 'android'
                ? firstAsset?.uri
                : firstAsset?.uri.replace('file://', ''),
            type: MEDIA_TYPE.VIDEO,
            name: firstAsset?.fileName,
          }
          // reactotron.log(img)
          if (callback) callback(img)
          resolve(img)
          // resolve(uri)
        }
      }
    )
  })
}
