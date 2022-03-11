/* eslint-disable react-native/no-inline-styles */
import R from '@app/assets/R'
import FstImage from '@app/components/FstImage'
import { colors, dimensions, fonts, styleView } from '@app/theme'
import React from 'react'
import { Text, View, ViewStyle } from 'react-native'
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

  if (dataMedia[0]?.type === MEDIA_TYPE.VIDEO) {
    dataMedia.splice(0, 1)
  }

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

  const renderFisrtImage = (style?: ViewStyle) => {
    if (dataMedia[0]?.type === MEDIA_TYPE.VIDEO) {
      // if (isLoadingThumb)
      //   return (
      //     <View style={[{ ...styleView.centerItem }, style]}>
      //       <ActivityIndicator size="small" />
      //     </View>
      //   )
      return (
        <View style={style}>
          <FstImage
            style={{ width: '100%', height: '100%', borderRadius: 5 }}
            source={{ uri: dataMedia[1]?.url }}
            resizeMode={'cover'}
          />
          <View
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              ...styleView.centerItem,
            }}
          >
            <FastImage
              style={{ width: 50, height: 50, borderRadius: 5 }}
              source={R.images.ic_play}
            />
          </View>
        </View>
      )
    } else
      return (
        <View style={style}>
          <FstImage
            style={{ width: '100%', height: '100%', borderRadius: 5 }}
            source={{ uri: dataMedia[0]?.url }}
            resizeMode={'cover'}
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
              source={R.images.img_default}
            />
          </View>
        )
      case 1:
        return renderFisrtImage({
          width: 345 * RATIO,
          height: 229 * RATIO,
          borderRadius: 5 * RATIO,
        })
      case 2:
        return (
          <View
            style={{ flex: 1, ...styleView.rowItemBetween, aspectRatio: 1.5 }}
          >
            {renderFisrtImage({
              width: 171 * RATIO,
              height: '100%',
              borderRadius: 5,
            })}
            <View
              style={{ width: ACTUAL_WIDTH * 0.495 }}
              children={
                <FstImage
                  style={{ width: '100%', height: '100%', borderRadius: 5 }}
                  source={{ uri: dataMedia[1]?.url }}
                  resizeMode={'cover'}
                />
              }
            />
          </View>
        )
      case 3:
        return (
          <View style={{ flex: 1, ...styleView.rowItemBetween }}>
            {renderFisrtImage({ width: 229 * RATIO })}
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
                  <FstImage
                    style={{ width: '100%', height: '100%', borderRadius: 5 }}
                    source={{ uri: dataMedia[1]?.url }}
                    resizeMode={'cover'}
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
                  <FstImage
                    style={{ width: '100%', height: '100%', borderRadius: 5 }}
                    source={{ uri: dataMedia[2]?.url }}
                    resizeMode={'cover'}
                  />
                }
              />
            </View>
          </View>
        )
      default:
        return (
          <View style={{ ...styleView.rowItemBetween, height: 229 * RATIO }}>
            {renderFisrtImage({ width: 229 * RATIO })}
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
                  <FstImage
                    style={{ width: '100%', height: '100%', borderRadius: 5 }}
                    source={{ uri: dataMedia[1]?.url }}
                    resizeMode={'cover'}
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
                  <FstImage
                    style={{ width: '100%', height: '100%', borderRadius: 5 }}
                    source={{ uri: dataMedia[2]?.url }}
                    resizeMode={'cover'}
                  />
                }
              />
              <View
                style={{
                  ...styleView.centerItem,
                  width: '100%',
                  height: 113 * RATIO,
                  backgroundColor: 'rgba(0,0,0,.4)',
                  position: 'absolute',
                  bottom: 0,
                  borderRadius: 5,
                }}
                children={
                  <Text
                    style={{ ...fonts.regular24, color: colors.white }}
                    children={`+${count - 3}`}
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
