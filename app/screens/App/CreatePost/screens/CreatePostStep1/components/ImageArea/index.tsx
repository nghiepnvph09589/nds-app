import R from '@app/assets/R'
import FstImage from '@app/components/FstImage'
import { MEDIA_TYPE } from '@app/constant/Constant'
import CreatePostApi from '@app/screens/App/CreatePost/api/CreatePostApi'
import { ArrayImage } from '@app/screens/App/CreatePost/model'
import { colors, dimensions, fonts } from '@app/theme'
import { showMessages } from '@app/utils/AlertHelper'
import { hideLoading, showLoading } from '@app/utils/LoadingProgressRef'
import React, { useState } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { createThumbnail } from 'react-native-create-thumbnail'
import ImagePicker from 'react-native-image-crop-picker'

const ImageArea = () => {
  const [dataImageVideo, setDataImageVideo] = useState<ArrayImage[]>([])

  const removeImage = (index: number) => {
    setDataImageVideo(prevState => {
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
      const dataImage = dataImageVideo.filter(
        item => item.type === MEDIA_TYPE.IMAGE
      )
      if (dataImage.length + images.length <= 10) {
        showLoading()
        const formData = new FormData()
        images.forEach(item => {
          formData.append('image', {
            uri:
              Platform.OS !== 'ios'
                ? item.sourceURL
                : item.sourceURL
                ? item.sourceURL.replace('file://', '')
                : item.sourceURL,
            name: item.filename,
            type: item.mime,
          })
        })
        try {
          const res = await CreatePostApi.uploadMultiFile(formData)
          const arrayImage = res.data.array_image_name.map(
            (value: ArrayImage) => {
              return { ...value, type: MEDIA_TYPE.IMAGE }
            }
          )
          setDataImageVideo(prevState => {
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
      const dataVideo = dataImageVideo.filter(
        item => item.type === MEDIA_TYPE.VIDEO
      )
      if (dataVideo.length === 0) {
        showLoading()
        const formData = new FormData()
        formData.append('video', {
          uri:
            Platform.OS !== 'ios'
              ? video.sourceURL
              : video.sourceURL
              ? video.sourceURL.replace('file://', '')
              : video.sourceURL,
          name: video.filename,
          type: video.mime,
        })
        try {
          const res = await CreatePostApi.uploadMultiFile(formData)
          const thumbnail = await createThumbnail({
            url: res.data.array_video_name[0]?.file_url,
            format: 'png',
            timeStamp: 0,
          })
          const arrayVideo = res.data.array_video_name.map(
            (value: ArrayImage) => {
              return {
                ...value,
                urlThumbnail: thumbnail.path,
                type: MEDIA_TYPE.VIDEO,
              }
            }
          )
          setDataImageVideo(prevState => {
            return prevState.concat(arrayVideo)
          })
        } catch (error) {
          console.error(error)
        } finally {
          hideLoading()
        }
      } else {
        showMessages(
          R.strings().notification,
          'Bạn chỉ được chọn tối đa 1 video'
        )
      }
    })
  }
  return (
    <>
      <View style={styles.v_button}>
        <TouchableOpacity onPress={uploadImage} style={styles.v_row}>
          <FstImage style={styles.icon} source={R.images.ic_image} />
          <Text style={styles.text}>Hình ảnh</Text>
        </TouchableOpacity>
        <View style={styles.v_line} />
        <TouchableOpacity onPress={uploadVideo} style={styles.v_row}>
          <FstImage style={styles.icon} source={R.images.ic_video} />
          <Text style={styles.text}>Video</Text>
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
                    item.type === MEDIA_TYPE.IMAGE
                      ? item.file_url
                      : item.urlThumbnail,
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
  },
  icon: {
    width: 24,
    height: 24,
  },
  text: {
    ...fonts.semi_bold16,
    marginLeft: 16,
    color: colors.text,
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
    width: dimensions.width / 3,
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