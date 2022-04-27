import {
  ActivityIndicator,
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useState } from 'react'
import { colors, dimensions, fonts, styleView } from '@app/theme'

import FstImage from '../FstImage'
import { ImageStyle } from 'react-native-fast-image'
import ImageViewer from 'react-native-image-zoom-viewer'
import Modal from 'react-native-modal'
import R from '@app/assets/R'
import Video from 'react-native-video'
import { getOffset } from '@app/utils/Responsive'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'

const RNImageViewer = ({
  data,
  title,
  styleImage,
  videoStyle,
}: {
  data: any
  title: string
  styleImage?: StyleProp<ImageStyle>
  videoStyle?: any
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [index, setIndex] = useState<number>(0)
  const dataImage = data?.map((item: any) => ({
    url: item?.media_url,
    // type: item?.type,
  }))
  const IMAGE = [
    'png',
    'jpg',
    'gif',
    'webp',
    'jpeg',
    'heic',
    'PNG',
    'JPG',
    'GIF',
    'JPEG',
    'HEIC',
  ]
  const MEDIA_TYPE = {
    IMAGE: 1,
    VIDEO: 2,
    OTHER: 0,
  }
  const VIDEO = ['mp4', 'avi', 'mov', 'MP4', 'AVI', 'MOV']
  const fileExtension = (file: string) => {
    if (!file) return
    const pattern = new RegExp('.[0-9A-Z-a-z]+$')
    const extension = file.match(pattern)?.toString().slice(1)
    return IMAGE.includes(extension!)
      ? MEDIA_TYPE.IMAGE
      : VIDEO.includes(extension!)
      ? MEDIA_TYPE.VIDEO
      : MEDIA_TYPE.OTHER
  }
  return (
    <View>
      {data?.length !== 0 && (
        <View style={styles.ctn_v_img}>
          <Text
            style={{ ...fonts.regular15, color: colors.textColor.gray8 }}
            children={title}
          />
          <View style={styles.list_img}>
            {data?.map((item: any, index: number) => {
              return (
                <TouchableOpacity
                  key={`${index}`}
                  onPress={() => {
                    setIndex(index)
                    setIsVisible(true)
                  }}
                >
                  {item?.type === 1 ? (
                    <FstImage
                      source={{ uri: item?.media_url }}
                      style={[
                        styles.img_update,
                        styleImage,
                        {
                          marginTop: index > 3 ? 5 : 0,
                          marginRight: index === 3 || index === 7 ? 0 : 5,
                        },
                      ]}
                    />
                  ) : (
                    <View
                      style={{
                        backgroundColor: colors?.backgroundColor,
                        borderRadius: 8,
                        marginBottom: 16,
                      }}
                    >
                      <Video
                        paused={true}
                        source={{ uri: item?.media_url }}
                        style={[styles.video_item, videoStyle]}
                      />
                      <View style={[styles.v_ic_play, videoStyle]}>
                        <FstImage
                          source={R.images.ic_play}
                          style={styles.ic_play}
                        />
                      </View>
                    </View>
                  )}
                </TouchableOpacity>
              )
            })}
          </View>
        </View>
      )}
      <Modal
        isVisible={isVisible}
        onBackdropPress={() => setIsVisible(false)}
        animationIn={'zoomIn'}
        animationOut={'zoomOut'}
        swipeDirection={'down'}
        style={styles.ctn}
      >
        {fileExtension(dataImage[0].url) === 1 ? (
          <ImageViewer
            imageUrls={dataImage}
            enableSwipeDown
            index={index}
            swipeDownThreshold={200}
            onSwipeDown={() => setIsVisible(false)}
            enablePreload
            loadingRender={() => <ActivityIndicator size={'large'} />}
            backgroundColor="#00000012"
            menuContext={null}
            renderIndicator={(index, length) => {
              if (length === 1) {
                return <></>
              }
              return (
                <View style={styles.v_index}>
                  <Text style={styles.txt_index}>{index + '/' + length}</Text>
                </View>
              )
            }}
            renderImage={props => (
              <>
                {fileExtension(props.source.uri) === 1 ? (
                  <FstImage
                    resizeMode="contain"
                    style={{
                      width: props.style.width,
                      height: props.style.height,
                    }}
                    source={{
                      uri: props.source.uri,
                    }}
                  />
                ) : (
                  <View style={[styles.video]}>
                    <Video
                      muted
                      controls
                      // paused={videoPause}
                      source={{
                        uri: props.source.uri,
                      }}
                      style={styles.img}
                    />
                  </View>
                )}
              </>
            )}
          />
        ) : (
          <View
            style={{
              alignItems: 'center',
              width: dimensions.width,
              height: dimensions.width,
            }}
          >
            <Video
              muted
              controls
              // paused={videoPause}
              source={{
                uri: dataImage[0].url,
              }}
              resizeMode="contain"
              style={{
                width: dimensions.width,
                height: dimensions.width,
                backgroundColor: colors.backgroundColor,
              }}
            />
          </View>
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
    </View>
  )
}

export default RNImageViewer

const styles = StyleSheet.create({
  ctn: {
    marginHorizontal: 0,
    margin: 0,
  },
  ctn_v_img: {
    marginTop: 15,
    // backgroundColor: 'red',
  },
  list_img: {
    ...styleView.rowItem,
    flexWrap: 'wrap',
    marginTop: 15,
  },
  img_update: {
    width: (dimensions.width - 78) / 4,
    height: (dimensions.width - 78) / 4,
    borderRadius: 8,
  },
  v_index: {
    position: 'absolute',
    zIndex: 9999,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: getOffset().top + 20,
  },
  txt_index: { color: 'white', ...fonts.semi_bold16 },
  img: {
    width: dimensions.width,
    height: dimensions.width,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ic_play: {
    width: 40,
    height: 40,
  },
  video: { flex: 1, width: '100%', justifyContent: 'center' },
  v_ic_play: {
    position: 'absolute',
    // backgroundColor: 'red',
    width: dimensions.width - 60,
    height: dimensions.width - 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  video_item: {
    width: dimensions.width - 60,
    height: dimensions.width - 60,
  },
})
