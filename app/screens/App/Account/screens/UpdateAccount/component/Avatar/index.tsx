import {
  Dimensions,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import FastImage, { Source } from 'react-native-fast-image'
import { hideLoading, showLoading } from '@app/utils/LoadingProgressRef'

import { API_STATUS } from '@app/constant/Constant'
import R from '@app/assets/R'
import React from 'react'
import RegisterApi from '@app/screens/Auth/Register/api/RegisterApi'
import { UpdateAccount } from '../../model'
import { getDataUserInfo } from '@app/screens/App/Account/slices/AccountSlice'
import { launchImageLibrary } from 'react-native-image-picker'
import { updateAccount } from '../../api'
import { useAppSelector } from '@app/store'
import { useDispatch } from 'react-redux'

const { width } = Dimensions.get('window')

const Avatar = ({
  onPress,
  source,
}: {
  onPress: (value: string) => void
  source: Source | number
}) => {
  const dispatch = useDispatch()
  const data = useAppSelector(state => state.accountReducer.data)
  const selectImagePress = async () => {
    showLoading()
    let payload: UpdateAccount = {
      phone: data?.phone,
      name: data?.name,
    }
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

      onPress(uri)
      let formData = new FormData()
      formData.append(`image`, {
        name: `image/${uri}`,
        type: 'image/jpeg',
        uri: uri,
      })
      const resAfterUpload: any = await RegisterApi.uploadFile(formData, 1)
      if (resAfterUpload.data?.filename) {
        payload = {
          ...payload,
          profile_picture_url: resAfterUpload.data?.filename,
        }
      }
      const res = await updateAccount(payload)
      if (res.code === API_STATUS.SUCCESS) {
        await dispatch(getDataUserInfo())
        hideLoading()
        // showMessages(
        //   R.strings().notification,
        //   'Bạn đã cập nhật tài khoản thành công',
        //   () => {
        //     NavigationUtil.goBack()
        //   }
        // )
      }
    } catch (error) {
      console.error(error)
    } finally {
      hideLoading()
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
