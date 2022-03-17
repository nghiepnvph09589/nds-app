/* eslint-disable react-native/no-inline-styles */
import R from '@app/assets/R'
import ImageModal from '@app/components/ImageModal'
import { DonateRequestMedia } from '@app/screens/App/Home/model'
import { dimensions, styleView } from '@app/theme'
import React, { useRef } from 'react'
import { View, ViewStyle } from 'react-native'
import FastImage from 'react-native-fast-image'
import useMediaData, { MEDIA_TYPE } from './hooks'

interface Props {
  data: DonateRequestMedia[]
}

const { width } = dimensions
const ACTUAL_WIDTH = width - 30
const RATIO = width / 375

const PostImageArea = (props: Props) => {
  const { data } = props
  const urlVideo = useRef<string>('')
  let { dataMedia } = useMediaData(
    data.map((item: { media_url: string }) => item.media_url)
  )

  const count = dataMedia?.length

  if (dataMedia[0]?.type === MEDIA_TYPE.VIDEO) {
    urlVideo.current = dataMedia[0].url
    if (dataMedia.length !== 1) {
      dataMedia[0].url = dataMedia[1].url
    }
  }

  const renderFirstImage = (style?: ViewStyle) => {
    if (dataMedia[0]?.type === MEDIA_TYPE.VIDEO) {
      return (
        <View style={style}>
          <ImageModal
            url={{ uri: dataMedia[1]?.url }}
            style={{ width: '100%', aspectRatio: 1 }}
            urls={dataMedia.map((value: { url: string }) => ({
              uri: value?.url,
            }))}
            currentIndex={0}
            isContainVideo={true}
            urlVideo={urlVideo.current}
          />
        </View>
      )
    } else
      return (
        <View style={style}>
          <ImageModal
            url={{ uri: dataMedia[0]?.url }}
            style={{ width: '100%', aspectRatio: 1 }}
            urls={dataMedia.map((value: { url: string }) => ({
              uri: value?.url,
            }))}
            currentIndex={0}
            urlVideo={urlVideo.current}
          />
        </View>
      )
  }

  const renderImage = () => {
    switch (count) {
      case 0:
        return (
          <View>
            <FastImage
              style={{
                width: 345 * RATIO,
                height: 229 * RATIO,
                borderRadius: 5 * RATIO,
              }}
              source={R.images.img_login}
            />
          </View>
        )
      case 1:
        return renderFirstImage({
          marginTop: 12,
          // width: 345 * RATIO,
          // height: 229 * RATIO,
          // borderRadius: 5 * RATIO,
        })
      case 2:
        return (
          <View style={{ flex: 1, ...styleView.rowItemBetween, marginTop: 8 }}>
            {renderFirstImage({
              width: 171 * RATIO,
              height: '100%',
            })}
            <View
              style={{ width: ACTUAL_WIDTH * 0.497 }}
              children={
                <ImageModal
                  url={{ uri: dataMedia[1]?.url }}
                  urls={dataMedia.map((value: { url: string }) => ({
                    uri: value?.url,
                  }))}
                  currentIndex={1}
                  style={{ width: '100%', height: '100%' }}
                  urlVideo={urlVideo.current}
                />
              }
            />
          </View>
        )
      case 3:
        return (
          <View style={{ flex: 1, ...styleView.rowItemBetween, marginTop: 8 }}>
            {renderFirstImage({ width: 229 * RATIO })}
            <View
              style={{
                flex: 1,
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                marginLeft: 3 * RATIO,
              }}
            >
              <View
                style={{ width: '100%', height: 113 * RATIO }}
                children={
                  <ImageModal
                    url={{ uri: dataMedia[1]?.url }}
                    urls={dataMedia.map((value: { url: string }) => ({
                      uri: value?.url,
                    }))}
                    currentIndex={1}
                    style={{ width: '100%', height: '100%' }}
                    urlVideo={urlVideo.current}
                  />
                }
              />
              <View
                style={{
                  width: '100%',
                  height: 113 * RATIO,
                  marginTop: 3 * RATIO,
                }}
                children={
                  <ImageModal
                    url={{ uri: dataMedia[2]?.url }}
                    urls={dataMedia.map((value: { url: string }) => ({
                      uri: value?.url,
                    }))}
                    currentIndex={2}
                    style={{ width: '100%', height: '100%' }}
                    urlVideo={urlVideo.current}
                  />
                }
              />
            </View>
          </View>
        )
      default:
        return (
          <View
            style={{
              flex: 1,
              ...styleView.rowItemBetween,
              marginTop: 8,
            }}
          >
            {renderFirstImage({ width: 229 * RATIO })}
            <View
              style={{
                flex: 1,
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                marginLeft: 3 * RATIO,
              }}
            >
              <View
                style={{ width: '100%', height: 113 * RATIO }}
                children={
                  <ImageModal
                    url={{ uri: dataMedia[1]?.url }}
                    urls={dataMedia.map((value: { url: string }) => ({
                      uri: value?.url,
                    }))}
                    currentIndex={1}
                    style={{ width: '100%', height: '100%' }}
                    urlVideo={urlVideo.current}
                  />
                }
              />
              <View
                style={{
                  width: '100%',
                  height: 113 * RATIO,
                  marginTop: 3 * RATIO,
                }}
                children={
                  <ImageModal
                    url={{ uri: dataMedia[2]?.url }}
                    urls={dataMedia.map((value: { url: string }) => ({
                      uri: value?.url,
                    }))}
                    currentIndex={2}
                    style={{ width: '100%', height: '100%' }}
                    count={count - 2}
                    urlVideo={urlVideo.current}
                  />
                }
              />
            </View>
          </View>
        )
    }
  }

  return <View style={{ width: '100%' }}>{renderImage()}</View>
}

export default PostImageArea
