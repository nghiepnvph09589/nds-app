/* eslint-disable react-native/no-inline-styles */
import R from '@app/assets/R'
import { colors, dimensions, fonts, styleView } from '@app/theme'
import { getOffset } from '@app/utils/Responsive'
import React, { useState } from 'react'
import {
  ActivityIndicator,
  Platform,
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import FastImage, { ResizeMode, Source } from 'react-native-fast-image'
import ImageViewer from 'react-native-image-zoom-viewer'
import { IImageInfo } from 'react-native-image-zoom-viewer/built/image-viewer.type'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import Modal from 'react-native-modal'
import Video from 'react-native-video'
import FstImage from '../FstImage'

type ImageUrlProps = Source | number

interface ImageModalProps {
  url: ImageUrlProps
  urls?: ImageUrlProps[]
  style?: StyleProp<ViewStyle>
  onPress?: () => void
  currentIndex?: number
  resizeMode?: ResizeMode
  count?: number
  isContainVideo?: boolean
  urlVideo?: any
}

const ImageModal = ({
  url,
  urls,
  style,
  onPress,
  currentIndex = 0,
  count,
  isContainVideo,
  urlVideo,
  resizeMode = 'cover',
}: ImageModalProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  let imagesArr: IImageInfo[] = urls
    ? urls.length
      ? urls.map(item => ({
          url:
            typeof item === 'number'
              ? item
              : typeof item !== 'undefined'
              ? item.uri
              : R.images.img_logo,
        }))
      : [{ url: typeof url !== 'number' ? url.uri : url }]
    : [{ url: typeof url !== 'number' ? url.uri : url }]
  const [indexCurrent, setIndexCurrent] = useState<number>(currentIndex)
  const [videoPause, setVideoPause] = useState<boolean>(false)

  return (
    <TouchableOpacity
      onPress={() => (onPress ? onPress : setIsVisible(true))}
      style={[
        {
          width: dimensions.width,
          aspectRatio: 1,
        },
        style,
      ]}
      activeOpacity={1}
    >
      {isContainVideo ? (
        <FstImage
          style={{ width: '100%', height: '100%' }}
          source={R.images.img_red_cross}
        >
          <View
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0,0,0,0.6)',
              ...styleView.centerItem,
            }}
          >
            <FastImage
              style={{ width: 42, height: 42 }}
              source={R.images.ic_play}
            />
          </View>
        </FstImage>
      ) : (
        <>
          <FastImage
            source={url}
            style={{ width: '100%', height: '100%' }}
            resizeMode={resizeMode}
          />
          {count && (
            <View
              style={{
                ...styleView.centerItem,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0,0,0,.4)',
                position: 'absolute',
                bottom: 0,
              }}
              children={
                <Text
                  style={{ ...fonts.regular24, color: colors.white }}
                  children={`+${count}`}
                />
              }
            />
          )}
        </>
      )}

      <Modal
        isVisible={isVisible}
        onBackdropPress={() => setIsVisible(false)}
        animationIn={'zoomIn'}
        animationOut={'zoomOut'}
        swipeDirection={'down'}
        onSwipeCancel={() => setIsVisible(false)}
        style={{
          marginHorizontal: 0, // This is the important style you need to set
          margin: 0,
        }}
      >
        {imagesArr.length === 1 && isContainVideo ? (
          <Video
            controls
            paused={videoPause}
            source={{
              uri: urlVideo,
            }}
            style={{
              width: dimensions.width,
              aspectRatio: 1,
              alignSelf: 'center',
            }}
          />
        ) : (
          <ImageViewer
            imageUrls={imagesArr}
            enableSwipeDown
            index={currentIndex}
            swipeDownThreshold={200}
            onSwipeDown={() => setIsVisible(false)}
            enablePreload
            loadingRender={() => <ActivityIndicator size={'large'} />}
            backgroundColor="#00000012"
            menuContext={null}
            renderIndicator={(vCurrentIndex, allSize) => {
              if (vCurrentIndex) {
                setIndexCurrent(vCurrentIndex)
              }
              if (vCurrentIndex !== 1) {
                setVideoPause(true)
              } else if (vCurrentIndex === 1) {
                setVideoPause(false)
              }
              if (!!allSize && allSize <= 1) {
                return <></>
              }
              return (
                <View
                  style={{
                    position: 'absolute',
                    zIndex: 9999,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    marginTop: getOffset().top + 20,
                  }}
                >
                  <Text style={{ color: 'white', ...fonts.semi_bold16 }}>
                    {vCurrentIndex + '/' + allSize}
                  </Text>
                </View>
              )
            }}
            renderImage={props => (
              <>
                {indexCurrent === 1 && !!urlVideo ? (
                  <View
                    style={{ flex: 1, width: '100%', justifyContent: 'center' }}
                  >
                    <Video
                      controls
                      paused={videoPause}
                      source={{
                        uri: urlVideo,
                      }}
                      style={{
                        width: '100%',
                        aspectRatio: 1,
                      }}
                    />
                  </View>
                ) : (
                  <FstImage
                    resizeMode="contain"
                    style={{
                      width: props.style.width,
                      height: props.style.height,
                      // alignSelf: 'center',
                    }}
                    source={{ uri: props.source.uri }}
                  />
                )}
              </>
            )}
          />
        )}
        <TouchableOpacity
          onPress={() => {
            setIsVisible(false)
          }}
          style={{
            position: 'absolute',
            top: Platform.OS !== 'ios' ? 100 : getStatusBarHeight() + 80,
            right: 30,
          }}
        >
          <FstImage
            style={{ width: 32, height: 32 }}
            source={R.images.ic_exit}
          />
        </TouchableOpacity>
      </Modal>
    </TouchableOpacity>
  )
}

export default ImageModal
