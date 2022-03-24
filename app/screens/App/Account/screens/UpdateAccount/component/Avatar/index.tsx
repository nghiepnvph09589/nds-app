import {
  Dimensions,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import FastImage, { Source } from 'react-native-fast-image'

import R from '@app/assets/R'
import React from 'react'
import { launchImageLibrary } from 'react-native-image-picker'
import reactotron from '@app/config/ReactotronConfig'

const { width } = Dimensions.get('window')

const Avatar = ({
  onPress,
  source,
}: {
  onPress: (value: string) => void
  source: Source | number
}) => {
  const selectImagePress = async () => {
    try {
      const result: any = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 1,
        maxWidth: 800,
        maxHeight: 800,
      })
      let firstAsset = result?.assets[0]
      let uri =
        Platform.OS === 'android'
          ? firstAsset?.uri
          : firstAsset?.uri.replace('file://', '')
      reactotron.logImportant!(uri)
      onPress(uri)
      //     )
      //   if (
      //     result.didCancel ||
      //     !result.assets?.length ||
      //     typeof result.assets[0].uri === 'undefined'
      //   ) {
      //     return
      //   }
      //   showLoading()
      //   const formData = new FormData()
      //   formData.append('image', {
      //     uri:
      //       Platform.OS === 'ios'
      //         ? result.assets[0].uri.replace('file://', '')
      //         : result.assets[0].uri,
      //     name: result.assets[0].fileName,
      //     type: result.assets[0].type,
      //   })
      //   try {
      //     const res = await RegisterApi.uploadFile(formData, 1)
      //     reactotron.logImportant!(res)
      //     onPress(
      //       !!res.data ? res.data.url.replace('http://', 'https://') : '',
      //       !!res.data ? res.data.filename : ''
      //     )
      //   } catch (error) {
      //     console.error(error)
      //   } finally {
      //     hideLoading()
      //   }
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <View style={styles.v_container}>
      <FastImage
        source={source || R.images.img_avatar_default}
        style={styles.img_avatar}
      />
      <TouchableOpacity onPress={selectImagePress} style={styles.btn_edit}>
        <FastImage source={R.images.ic_edit_avatar} style={styles.img_camera} />
      </TouchableOpacity>
    </View>
  )
}
export default Avatar

const styles = StyleSheet.create({
  v_container: {
    alignSelf: 'center',
    marginTop: 5,
  },
  img_avatar: {
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: width * 0.14,
  },
  btn_edit: {
    position: 'absolute',
    bottom: 10,
    right: 5,
  },
  img_camera: {
    width: width * 0.057,
    height: width * 0.057,
  },
})
