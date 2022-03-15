/* eslint-disable prettier/prettier */
import R from '@app/assets/R'
import { dimensions, fonts } from '@app/theme'
import { getOffset } from '@app/utils/Responsive'
import React, { useRef, useState } from 'react'
import {
  ActivityIndicator,
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import FastImage, { ResizeMode, Source } from 'react-native-fast-image'
import ImageViewer from 'react-native-image-zoom-viewer'
import { IImageInfo } from 'react-native-image-zoom-viewer/built/image-viewer.type'
import Modal from 'react-native-modal'
import FstImage from '../FstImage'
import Video from 'react-native-video'

type ImageUrlProps = Source | number

interface ImageModalProps {
  url: ImageUrlProps
  urls?: ImageUrlProps[]
  style?: StyleProp<ViewStyle>
  onPress?: () => void
  currentIndex?: number
  resizeMode?: ResizeMode
  count?: number
}

const ImageModal = ({
  url,
  urls,
  style,
  onPress,
  currentIndex = 0,
  count,
  resizeMode = 'cover',
}: ImageModalProps) => {
  const { width } = dimensions
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const imagesArr: IImageInfo[] = !!urls
    ? !!urls.length
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
      onPress={() => (!!onPress ? onPress : setIsVisible(true))}
      style={[
        {
          width: dimensions.width,
          aspectRatio: 1,
        },
        style,
      ]}
      activeOpacity={1}
    >
      <FastImage
        source={url}
        style={{ width: '100%', height: '100%' }}
        resizeMode={resizeMode}
      />

      <Modal
        isVisible={isVisible}
        onBackdropPress={() => setIsVisible(false)}
        animationIn={'zoomIn'}
        animationOut={'zoomOut'}
        swipeDirection={'down'}
        onSwipeCancel={() => setIsVisible(false)}
        style={{
          backgroundColor: 'transparent',
          marginHorizontal: 0, // This is the important style you need to set
          // alignItems: undefined,
          // justifyContent: undefined,
        }}
      >
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
              {indexCurrent === 1 ? (
                <Video
                  controls
                  //ref={videoRef}
                  paused={videoPause}
                  //onLoad={onVideoLoad}
                  source={{
                    uri: props.source.uri,
                  }}
                  style={{
                    width: dimensions.width,
                    aspectRatio: 1,
                    alignSelf: 'center',
                    //backgroundColor: 'red',
                    // position: 'absolute',
                    // top: 10,
                    // left: 0,
                    // right: 0,
                  }}
                />
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
      </Modal>
    </TouchableOpacity>
  )
}

export default ImageModal
