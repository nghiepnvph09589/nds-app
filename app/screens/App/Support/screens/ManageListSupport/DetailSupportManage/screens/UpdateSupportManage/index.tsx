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
import NavigationUtil from '@app/navigation/NavigationUtil'
import R from '@app/assets/R'
import ScreenWrapper from '@app/components/Screen/ScreenWrapper'
import SelectVideo from './components/SelectVideo'
import { isIphoneX } from 'react-native-iphone-x-helper'
import reactotron from 'reactotron-react-native'
import { requestUpdateSupportManage } from './api'
import { showMessages } from '@app/utils/AlertHelper'

interface Props {
  route: { params: { id: number; onAction: () => void } }
}
const UpdateSupportManage = (props: Props) => {
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [listImage, setListImage] = useState<any[]>([])
  const [video, setVideo] = useState<any>('')
  const [loadingImage, setLoadingImage] = useState<boolean>(false)
  const [loadingVideo, setLoadingVideo] = useState<boolean>(false)
  const [date, setDate] = useState<any>('')

  const selectImage = async () => {
    setLoadingImage(true)
    try {
      await launchImageLibraryMultiple(
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
        },
        () => {
          setLoadingImage(false)
        }
      )
    } catch (error) {
    } finally {
      setLoadingImage(false)
    }
  }

  const selectVideo = async () => {
    setLoadingVideo(true)
    try {
      await launchImageLibrary(
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
        },
        () => {
          setLoadingVideo(false)
        }
      )
    } catch (error) {
    } finally {
      setLoadingVideo(false)
    }
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
    const listMedia = listImage.concat(video ? [video] : [])
    if (title.trim() === '') {
      showMessages(R.strings().notification, 'Vui lòng nhập tiêu đề')
      return
    }
    if (content.trim() === '') {
      showMessages(R.strings().notification, 'Vui lòng nhập nội dung')
      return
    }
    if (date.trim() === '') {
      showMessages(R.strings().notification, 'Vui lòng chọn ngày thực hiện')
      return
    }
    if (listMedia.length === 0) {
      showMessages(R.strings().notification, 'Vui lòng chọn hình ảnh/video')
      return
    }
    Keyboard.dismiss()
    showLoading()
    try {
      let params: any = {
        title: title,
        content: content,
        end_date: new Date(date).toISOString(),
      }
      if (listMedia.length !== 0) {
        const formData = new FormData()
        listMedia.forEach(item => {
          if (item.type === MEDIA_TYPE.IMAGE) {
            formData.append('image', {
              uri: item.uri,
              name: item.name,
              type: 'image/jpeg',
            })
          } else if (item.type === MEDIA_TYPE.VIDEO) {
            formData.append('video', {
              uri: item.uri,
              name: item.name,
              type: 'video/mp4',
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
          params = {
            ...params,
            array_image: arrImage.concat(arrVideo),
          }
        }
      }
      const payload = {
        id: props?.route?.params?.id,
        params: params,
      }
      reactotron.log!(payload)
      const res = await requestUpdateSupportManage(payload)
      if (res?.code === API_STATUS.SUCCESS) {
        showMessages(R.strings().notification, 'Cập nhật hoàn thành!', () => {
          NavigationUtil.goBack()
          props?.route?.params?.onAction()
        })
      }
    } catch (error) {
      hideLoading()
    } finally {
      hideLoading()
    }
  }
  // if (loading) return <Loading />
  return (
    <ScreenWrapper
      back
      scroll={false}
      color={colors.text}
      backgroundHeader="white"
      forceInset={['left']}
      titleHeader={'Cập nhật hình ảnh'}
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
          onChange={setDate}
        />
        <ListImage
          listImage={listImage}
          deleteImage={deleteImage}
          selectImage={selectImage}
          loading={loadingImage}
        />
        <SelectVideo
          onDelete={() => {
            setVideo('')
          }}
          video={video}
          selectVideo={selectVideo}
          loading={loadingVideo}
        />
      </ScrollView>
      <TouchableOpacity onPress={onSubmit} style={styles.btn_submit}>
        <Text
          style={{ ...fonts.semi_bold16, color: colors.white }}
          children={'Lưu'}
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
