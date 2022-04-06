import R from '@app/assets/R'
import FstImage from '@app/components/FstImage'
import reactotron from '@app/config/ReactotronConfig'
import { MEDIA_TYPE } from '@app/constant/Constant'
import UpdatePostApi from '@app/screens/App/UpdatePost/api/UpdatePostApi'
import { Media } from '@app/screens/App/UpdatePost/model'
import { useAppSelector } from '@app/store'
import { colors, dimensions, fonts } from '@app/theme'
import { showMessages } from '@app/utils/AlertHelper'
import { hideLoading, showLoading } from '@app/utils/LoadingProgressRef'
import React, { useEffect, useState } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { createThumbnail } from 'react-native-create-thumbnail'
import ImagePicker from 'react-native-image-crop-picker'

interface ImageAreaProps {
  onPress: (mediaArray: Media[]) => void
}

const ImageArea = (props: ImageAreaProps) => {
  const { onPress } = props
  const dataPost = useAppSelector(state => state.updatePostReducer)
  const [dataImageVideo, setDataImageVideo] = useState<Media[]>(
    JSON.parse(JSON.stringify(dataPost.new_media))
  )

  useEffect(() => {
    const newData = [...dataImageVideo]
    newData.forEach(async (item, index) => {
      if (item.type === MEDIA_TYPE.VIDEO) {
        const thumbnail = await createThumbnail({
          url: item.url ? item.url : '',
          format: 'png',
          timeStamp: 0,
        })
        newData[index].urlVideo = thumbnail.path
        setDataImageVideo([...newData])
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
      console.log(images)
      const dataImage = dataImageVideo.filter(
        item => item.type === MEDIA_TYPE.IMAGE
      )
      if (dataImage.length + images.length <= 10) {
        showLoading()
        const formData = new FormData()
        images.forEach(item => {
          formData.append('image', {
            uri: item.path,
            name:
              Platform.OS !== 'ios'
                ? item.path.substring(item.path.lastIndexOf('/') + 1)
                : item.filename,
            type: item.mime,
          })
        })
        try {
          const res = await UpdatePostApi.uploadMultiFile(formData)
          const arrayImage = res.data.array_image_name.map(
            (value: { file_name: string; file_url: string }) => {
              return {
                media_url: value.file_name,
                type: MEDIA_TYPE.IMAGE,
                url: value.file_url,
              }
            }
          )
          setDataImageVideo(prevState => {
            onPress(prevState.concat(arrayImage))
            return prevState.concat(arrayImage)
          })
        } catch (error) {
          console.error(error)
        } finally {
          hideLoading()
        }
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
        item => item.type === MEDIA_TYPE.VIDEO
      )
      if (dataVideo.length === 0) {
        showLoading()
        const formData = new FormData()
        formData.append('video', {
          uri: video.path,
          name:
            Platform.OS !== 'ios'
              ? video.path.substring(video.path.lastIndexOf('/') + 1)
              : video.filename,
          type: video.mime,
        })
        try {
          const res = await UpdatePostApi.uploadMultiFile(formData)
          const thumbnail = await createThumbnail({
            url: res.data.array_video_name[0]?.file_url,
            format: 'png',
            timeStamp: 0,
          })
          const arrayVideo = res.data.array_video_name.map(
            (value: { file_name: string; file_url: string }) => {
              return {
                urlVideo: thumbnail.path,
                media_url: value.file_name,
                type: MEDIA_TYPE.VIDEO,
                url: value.file_url,
              }
            }
          )
          setDataImageVideo(prevState => {
            onPress(prevState.concat(arrayVideo))
            return prevState.concat(arrayVideo)
          })
        } catch (error) {
          console.error(error)
        } finally {
          hideLoading()
        }
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
                    item.type === MEDIA_TYPE.IMAGE ? item.url : item.urlVideo,
                }}
              >
                {item.type === MEDIA_TYPE.VIDEO && (
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
