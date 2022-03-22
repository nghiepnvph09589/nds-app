import R from '@app/assets/R'
import FstImage from '@app/components/FstImage'
import reactotron from '@app/config/ReactotronConfig'
import { MEDIA_TYPE } from '@app/constant/Constant'
import { ArrayImage } from '@app/screens/CreatePost/model'
import { useAppSelector } from '@app/store'
import { colors, dimensions, fonts } from '@app/theme'
import { showMessages } from '@app/utils/AlertHelper'
import React, { useEffect, useState } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { createThumbnail } from 'react-native-create-thumbnail'
import ImagePicker, { Image } from 'react-native-image-crop-picker'

interface ImageAreaProps {
  onPress: (mediaArray: ArrayImage[]) => void
}

const ImageArea = (props: ImageAreaProps) => {
  const { onPress } = props
  const [dataImageVideo, setDataImageVideo] = useState<ArrayImage[]>([])

  const dataCreatPost = useAppSelector(state => state.creatPostReducer)

  useEffect(() => {
    if (dataCreatPost.media.length === 0) {
      setDataImageVideo([])
    }
  }, [dataCreatPost])

  const removeImage = (index: number) => {
    setDataImageVideo(prevState => {
      onPress(
        prevState
          .slice(0, index)
          .concat(prevState.slice(index + 1, prevState.length))
      )
      return prevState
        .slice(0, index)
        .concat(prevState.slice(index + 1, prevState.length))
    })
  }

  const uploadImage = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      multiple: true,
    }).then(async images => {
      reactotron.log!(images)
      const dataImage = dataImageVideo.filter(
        item => item.typeMedia === MEDIA_TYPE.IMAGE
      )
      if (dataImage.length + images.length <= 10) {
        const arrayImage = images.map((item: Image) => {
          return {
            uri:
              Platform.OS !== 'ios'
                ? item.path
                : item.sourceURL
                ? item.sourceURL.replace('file://', '')
                : '',
            typeMedia: MEDIA_TYPE.IMAGE,
            type: item.mime,
            name: Platform.OS !== 'ios' ? item.modificationDate : item.filename,
          }
        })
        setDataImageVideo(prevState => {
          onPress(prevState.concat(arrayImage))
          return prevState.concat(arrayImage)
        })
      } else {
        showMessages(
          R.strings().notification,
          'Bạn chỉ được chọn tối đa 10 ảnh'
        )
      }
    })
  }

  const uploadVideo = () => {
    ImagePicker.openPicker({
      mediaType: 'video',
    }).then(async video => {
      reactotron.log!(video)
      const dataVideo = dataImageVideo.filter(
        item => item.typeMedia === MEDIA_TYPE.VIDEO
      )
      if (dataVideo.length === 0) {
        try {
          const thumbnail = await createThumbnail({
            url:
              Platform.OS !== 'ios'
                ? video.path
                : video.sourceURL
                ? video.sourceURL.replace('file://', '')
                : '',

            format: 'png',
            timeStamp: 0,
          })
          const arrayVideo = [
            {
              urlThumbnail: thumbnail.path,
              uri:
                Platform.OS !== 'ios'
                  ? video.path
                  : video.sourceURL
                  ? video.sourceURL.replace('file://', '')
                  : video.sourceURL,
              typeMedia: MEDIA_TYPE.VIDEO,
              type: video.mime,
              name:
                Platform.OS !== 'ios' ? video.modificationDate : video.filename,
            },
          ]
          setDataImageVideo(prevState => {
            onPress(prevState.concat(arrayVideo))
            return prevState.concat(arrayVideo)
          })
        } catch (error) {}
      } else {
        showMessages(R.strings().notification, R.strings().note_video)
      }
    })
  }

  return (
    <>
      <View style={styles.v_button}>
        <TouchableOpacity onPress={uploadImage} style={styles.v_row}>
          <FstImage style={styles.icon} source={R.images.ic_image} />
          <Text style={styles.text}>{R.strings().image}</Text>
        </TouchableOpacity>
        <View style={styles.v_line} />
        <TouchableOpacity onPress={uploadVideo} style={styles.v_row}>
          <FstImage style={styles.icon} source={R.images.ic_video} />
          <Text style={styles.text}>{R.strings().video}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.v_list_image}>
        {dataImageVideo.map((item, i) => (
          <>
            <View key={i}>
              <FstImage
                style={styles.image}
                source={{
                  uri:
                    item.typeMedia === MEDIA_TYPE.IMAGE
                      ? item.uri
                      : item.urlThumbnail,
                }}
              >
                {item.typeMedia === MEDIA_TYPE.VIDEO && (
                  <FstImage style={styles.ic_play} source={R.images.ic_play} />
                )}
              </FstImage>
              <TouchableOpacity
                onPress={() => {
                  removeImage(i)
                }}
                style={styles.v_exit}
              >
                <FstImage style={styles.ic_exit} source={R.images.ic_exit2} />
              </TouchableOpacity>
            </View>
          </>
        ))}
      </View>
    </>
  )
}

export default ImageArea

const styles = StyleSheet.create({
  v_row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    width: dimensions.width / 2 - 1,
    justifyContent: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
  text: {
    ...fonts.regular16,
    marginLeft: 16,
    color: colors.text,
    fontWeight: '500',
  },
  v_button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 1,
    backgroundColor: 'white',
  },
  v_line: {
    backgroundColor: '#ADB5BD',
    width: 1,
    height: 20,
  },
  v_list_image: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  image: {
    width: dimensions.width / 4,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  v_exit: {
    position: 'absolute',
    top: 6,
    right: 6,
  },
  ic_exit: {
    width: 18,
    height: 18,
  },
  ic_play: {
    width: 30,
    height: 30,
    alignSelf: 'center',
  },
})
