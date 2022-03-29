import { API_STATUS, MEDIA_TYPE } from '@app/constant/Constant'
import {
  Keyboard,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native'
import React, { useState } from 'react'
import { colors, dimensions, fonts } from '@app/theme'
import { hideLoading, showLoading } from '@app/utils/LoadingProgressRef'
import { launchImageLibrary, launchImageLibraryMultiple } from './SelectMedia'

import CreatePostApi from '@app/screens/App/CreatePost/api/CreatePostApi'
import InputUpdate from './components/InputUpdate'
import ListImage from './components/ListImage'
import ScreenWrapper from '@app/components/Screen/ScreenWrapper'
import SelectVideo from './components/SelectVideo'
import { isIphoneX } from 'react-native-iphone-x-helper'
import reactotron from 'reactotron-react-native'

const UpdateSupportManage = () => {
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [listImage, setListImage] = useState<any[]>([])
  const [video, setVideo] = useState<any>('')

  const selectImage = () => {
    launchImageLibraryMultiple(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 500,
        maxWidth: 500,
        selectionLimit: 4 - listImage.length,
        includeExtra: true,
      },
      (res: any) => {
        setListImage(listImage.concat(res))
      }
    )
  }

  const selectVideo = () => {
    launchImageLibrary(
      {
        mediaType: 'video',
        includeBase64: false,
        maxHeight: 500,
        maxWidth: 500,
        selectionLimit: 1,
        includeExtra: true,
      },
      (res: any) => {
        setVideo(res)
      }
    )
  }
  const deleteImage = async (index: number) => {
    let list = listImage
    let img_delete = list.splice(index, 1)
    let listImg = listImage.map((e: any) => {
      if (e !== img_delete) return e
    })
    setListImage(listImg)
  }

  const onSubmit = async () => {
    Keyboard.dismiss()
    showLoading()
    const listMedia = listImage.concat([video])
    try {
      let payload: any = {
        title: title,
        content: content,
      }
      if (listMedia.length !== 0) {
        const formData = new FormData()
        listMedia.forEach(item => {
          if (item.type === MEDIA_TYPE.IMAGE) {
            formData.append('image', {
              uri: item.uri,
              name: item.name,
              type: item.type,
            })
          } else if (item.type === MEDIA_TYPE.VIDEO) {
            formData.append('video', {
              uri: item.uri,
              name: item.name,
              type: item.type,
            })
          }
        })
        const resAfterUpload = await CreatePostApi.uploadMultiFile(formData)
        if (resAfterUpload?.code === API_STATUS.SUCCESS) {
          let arrImage = resAfterUpload.data.array_image_name?.map(
            (item: any) => ({
              url: item?.file_name,
              type: MEDIA_TYPE.IMAGE,
            })
          )
          let arrVideo = resAfterUpload.data.array_video_name?.map(
            (item: any) => ({
              url: item?.file_name,
              type: MEDIA_TYPE.VIDEO,
            })
          )
          payload = {
            ...payload,
            media: arrImage.concat(arrVideo),
          }
        }
      }
      reactotron.log!(payload)
    } catch (error) {
      hideLoading()
    } finally {
      hideLoading()
    }
  }
  return (
    <ScreenWrapper
      back
      scroll={false}
      color={colors.text}
      backgroundHeader="white"
      forceInset={['left']}
      titleHeader={'Cập nhật ủng hộ'}
      borderBottomHeader={colors.border}
      style={styles.ctn}
    >
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={styles.body}
        contentContainerStyle={styles.body_ctn}
      >
        <InputUpdate
          title={title}
          content={content}
          setTitle={setTitle}
          setContent={setContent}
        />
        <ListImage
          listImage={listImage}
          deleteImage={deleteImage}
          selectImage={selectImage}
        />
        <SelectVideo
          onDelete={() => {
            setVideo('')
          }}
          video={video}
          selectVideo={selectVideo}
        />
      </ScrollView>
      <TouchableOpacity onPress={onSubmit} style={styles.btn_submit}>
        <Text
          style={{ ...fonts.semi_bold16, color: colors.white }}
          children={'Cập nhật'}
        />
      </TouchableOpacity>
    </ScreenWrapper>
  )
}

export default UpdateSupportManage

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  body_ctn: {
    paddingBottom: dimensions.height / 3,
  },
  ctn: {
    backgroundColor: colors.white,
  },
  btn_submit: {
    backgroundColor: colors.primary,
    marginBottom: Platform.OS === 'ios' ? (isIphoneX() ? 0 : 20) : 0,
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 12,
    marginHorizontal: 15,
  },
})
