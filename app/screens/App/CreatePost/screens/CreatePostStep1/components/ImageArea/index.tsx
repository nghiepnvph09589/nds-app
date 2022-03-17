import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native'
import React, { useState } from 'react'
import FstImage from '@app/components/FstImage'
import R from '@app/assets/R'
import { colors, dimensions, fonts } from '@app/theme'
import reactotron from '@app/config/ReactotronConfig'
import ImagePicker from 'react-native-image-crop-picker'
import CreatePostApi from '@app/screens/App/CreatePost/api/CreatePostApi'
import { hideLoading, showLoading } from '@app/utils/LoadingProgressRef'
import RegisterApi from '@app/screens/Auth/Register/api/RegisterApi'
const ImageArea = () => {
  const [dataImage, setDataImage] = useState([])
  const uploadImage = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      multiple: true,
    }).then(async images => {
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
      reactotron.log!(formData)

      try {
        const res = await CreatePostApi.uploadMultiFile(formData)
        reactotron.logImportant!(res)
      } catch (error) {
        console.error(error)
      } finally {
        hideLoading()
      }
    })
  }

  const uploadVideo = () => {
    ImagePicker.openPicker({
      mediaType: 'video',
    }).then(async video => {
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
        const res = await RegisterApi.uploadFile(formData, 2)
        reactotron.logImportant!(res)
      } catch (error) {
        console.error(error)
      } finally {
        hideLoading()
      }
    })
  }
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 1,
          backgroundColor: 'white',
        }}
      >
        <TouchableOpacity onPress={uploadImage} style={styles.v_row}>
          <FstImage style={styles.icon} source={R.images.ic_image} />
          <Text style={styles.text}>Hình ảnh</Text>
        </TouchableOpacity>
        <View style={{ backgroundColor: '#ADB5BD', width: 1, height: 20 }} />
        <TouchableOpacity onPress={uploadVideo} style={styles.v_row}>
          <FstImage style={styles.icon} source={R.images.ic_video} />
          <Text style={styles.text}>Video</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}
      >
        {dataImage.map((item, i) => (
          <>
            <View key={i}>
              <TouchableOpacity style={{ position: 'absolute', top: 10 }}>
                <FstImage
                  style={{ width: 18, height: 18 }}
                  source={R.images.ic_exit2}
                />
              </TouchableOpacity>
              <FstImage
                style={{ width: dimensions.width / 3, aspectRatio: 1 }}
                source={R.images.img_login}
              />
              <TouchableOpacity
                style={{ position: 'absolute', top: 6, right: 6 }}
              >
                <FstImage
                  style={{ width: 18, height: 18 }}
                  source={R.images.ic_exit2}
                />
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
})
