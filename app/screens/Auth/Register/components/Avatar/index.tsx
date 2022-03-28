import R from '@app/assets/R'
import FstImage from '@app/components/FstImage'
import reactotron from '@app/config/ReactotronConfig'
import { hideLoading, showLoading } from '@app/utils/LoadingProgressRef'
import React from 'react'
import { Platform, StyleSheet, TouchableOpacity } from 'react-native'
import { launchImageLibrary } from 'react-native-image-picker'
import RegisterApi from '../../api/RegisterApi'

interface AvatarProps {
  onPress: (url: string, fileName: string) => void
  url: string
}

const Avatar = (props: AvatarProps) => {
  const { onPress, url } = props
  const selectImagePress = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 1,
        maxWidth: 800,
        maxHeight: 800,
      })

      if (
        result.didCancel ||
        !result.assets?.length ||
        typeof result.assets[0].uri === 'undefined'
      ) {
        return
      }
      showLoading()
      const formData = new FormData()
      formData.append('image', {
        uri:
          Platform.OS === 'ios'
            ? result.assets[0].uri.replace('file://', '')
            : result.assets[0].uri,
        name: result.assets[0].fileName,
        type: result.assets[0].type,
      })
      try {
        const res = await RegisterApi.uploadFile(formData, 1)
        reactotron.logImportant!(res)
        onPress(
          res.data ? res.data.url.replace('http://', 'https://') : '',
          res.data ? res.data.filename : ''
        )
      } catch (error) {
        console.error(error)
      } finally {
        hideLoading()
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <TouchableOpacity onPress={selectImagePress}>
      <FstImage
        source={url ? { uri: url } : R.images.img_avatar}
        // eslint-disable-next-line react-native/no-inline-styles
        style={[styleAvatar.avatar, { borderRadius: url ? 100 / 2 : 0 }]}
        resizeMode="cover"
      />
    </TouchableOpacity>
  )
}

const styleAvatar = StyleSheet.create({
  avatar: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 44,
    marginTop: 40,
  },
})

export default Avatar
