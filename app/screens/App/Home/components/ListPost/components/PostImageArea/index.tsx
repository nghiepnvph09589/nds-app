/* eslint-disable react-native/no-inline-styles */
import R from '@app/assets/R'
import ImageModal from '@app/components/ImageModal'
import { dimensions, styleView } from '@app/theme'
import React from 'react'
import { View, ViewStyle } from 'react-native'
import FastImage from 'react-native-fast-image'
import useMediaData, { MEDIA_TYPE } from './hooks'

interface Props {
  data: any
}

const { width } = dimensions
const ACTUAL_WIDTH = width - 30
const RATIO = width / 375

const PostImageArea = (props: Props) => {
  const { data } = props
  let { dataMedia } = useMediaData(
    data.map((item: { media_url: any }) => item.media_url)
  )

  const count = dataMedia?.length

  // if (dataMedia[0]?.type === MEDIA_TYPE.VIDEO) {
  //   dataMedia.splice(0, 1)
  // }

  //   const [thumbnailVideo, setThumbnailVideo] = useState<string>()
  //   const [isLoadingThumb, setIsLoadingThumb] = useState<boolean>(true)

  //   const renderThumbnail = async () => {
  //     try {
  //       setIsLoadingThumb(true)
  //       const thumbnail = await createThumbnail({
  //         url: dataMedia[0]?.url,

  //         format: 'jpeg',
  //         timeStamp: 0,
  //       })
  //       setThumbnailVideo(thumbnail.path)
  //     } catch (err) {
  //       // console.log(err)
  //     } finally {
  //       setIsLoadingThumb(false)
  //     }
  //   }

  // useEffect(() => {
  //   dataMedia[0]?.type == MEDIA_TYPE.VIDEO && renderThumbnail()
  // }, [])

  const renderFirstImage = (style?: ViewStyle) => {
    if (dataMedia[0]?.type === MEDIA_TYPE.VIDEO) {
      // if (isLoadingThumb)
      //   return (
      //     <View style={[{ ...styleView.centerItem }, style]}>
      //       <ActivityIndicator size="small" />
      //     </View>
      //   )
      return (
        <View style={style}>
          <View
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              ...styleView.centerItem,
              backgroundColor: 'black',
            }}
          >
            <FastImage
              style={{ width: 42, height: 42 }}
              source={R.images.ic_play}
            />
          </View>
        </View>
      )
    } else
      return (
        <View style={style}>
          {/* <FstImage
            style={{ width: '100%', aspectRatio: 1 }}
            //source={{ uri: dataMedia[0]?.url }}
            source={R.images.img_login}
            resizeMode={'cover'}
          /> */}
          <ImageModal
            url={{ uri: dataMedia[0]?.url }}
            style={{ width: '100%', aspectRatio: 1 }}
            urls={dataMedia.map((value: { url: string }) => ({
              uri: value?.url,
            }))}
            currentIndex={0}
            count={2}
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
