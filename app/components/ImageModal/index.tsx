/* eslint-disable prettier/prettier */
import R from '@app/assets/R'
import { colors, dimensions, fonts, styleView } from '@app/theme'
import { getOffset } from '@app/utils/Responsive'
import React, { useState } from 'react'
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
  const RATIO = width / 375
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

      <Modal
        isVisible={isVisible}
        onBackdropPress={() => setIsVisible(false)}
        animationIn={'zoomIn'}
        animationOut={'zoomOut'}
        swipeDirection={'down'}
        onSwipeCancel={() => setIsVisible(false)}
        style={{
          backgroundColor: 'transparent',
          margin: 0, // This is the important style you need to set
          alignItems: undefined,
          justifyContent: undefined,
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
          renderHeader={() => <View style={{ backgroundColor: 'red' }} />}
          renderIndicator={(vCurrentIndex, allSize) => {
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
        />
      </Modal>
    </TouchableOpacity>
  )
}

export default ImageModal
