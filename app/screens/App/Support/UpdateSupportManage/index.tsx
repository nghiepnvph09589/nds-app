import R from '@app/assets/R'
import ScreenWrapper from '@app/components/Screen/ScreenWrapper'
import {
  API_STATUS,
  MEDIA_TYPE,
  SCREEN_ROUTER_APP,
} from '@app/constant/Constant'
import NavigationUtil from '@app/navigation/NavigationUtil'
import CreatePostApi from '@app/screens/App/CreatePost/api/CreatePostApi'
import { colors, dimensions, fonts } from '@app/theme'
import { showMessages } from '@app/utils/AlertHelper'
import { hideLoading, showLoading } from '@app/utils/LoadingProgressRef'
import React, { useState } from 'react'
import {
  Keyboard,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'
import { isIphoneX } from 'react-native-iphone-x-helper'
import InputUpdate from '../components/InputUpdate'
import ListImage from '../components/ListImage'
import SelectVideo from '../components/SelectVideo'
import { requestUpdateSupportManage } from './api'

interface Props {
  route: { params: { id: number; onAction: () => void } }
}
const UpdateSupportManage = (props: Props) => {
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [listImage, setListImage] = useState<any[]>([])
  const [video, setVideo] = useState<any>('')
  const [date, setDate] = useState<any>('')

  const selectImage = async () => {
    // setLoadingImage(true)
    // try {
    //   await launchImageLibraryMultiple(
    //     {
    //       mediaType: 'photo',
    //       includeBase64: false,
    //       maxHeight: 500,
    //       maxWidth: 500,
    //       selectionLimit: 10 - listImage.length,
    //       includeExtra: true,
    //     },
    //     (res: any) => {
    //       setListImage(listImage.concat(res))
    //     },
    //     () => {
    //       setLoadingImage(false)
    //     }
    //   )
    // } catch (error) {
    // } finally {
    //   setLoadingImage(false)
    // }
    ImagePicker.openPicker({
      mediaType: 'photo',
      multiple: true,
      minFiles: 1,
      maxFiles: 10 - listImage.length,
    }).then(async images => {
      let arrayImage = images.map((item: any) => {
        return {
          uri: item.path,
          typeMedia: MEDIA_TYPE.IMAGE,
          type: item.mime,
          name:
            Platform.OS !== 'ios'
              ? item.path.substring(item.path.lastIndexOf('/') + 1)
              : item.filename,
        }
      })
      setListImage(listImage.concat(arrayImage))
    })
  }

  const selectVideo = async () => {
    // setLoadingVideo(true)
    // try {
    //   await launchImageLibrary(
    //     {
    //       mediaType: 'video',
    //       includeBase64: false,
    //       maxHeight: 500,
    //       maxWidth: 500,
    //       selectionLimit: 1,
    //       includeExtra: true,
    //     },
    //     (res: any) => {
    //       setVideo(res)
    //     },
    //     () => {
    //       setLoadingVideo(false)
    //     }
    //   )
    // } catch (error) {
    // } finally {
    //   setLoadingVideo(false)
    // }
    ImagePicker.openPicker({
      mediaType: 'video',
      minFiles: 1,
    }).then(async images => {
      if (images.size / 1024 / 1024 > 32) {
        showMessages(
          R.strings().notification,
          'Dung lượng video quá dài xin thử lại'
        )
        return
      }
      let video: any = {
        uri: images.path,
        typeMedia: MEDIA_TYPE.VIDEO,
        type: images.mime,
        name:
          Platform.OS !== 'ios'
            ? images.path.substring(images.path.lastIndexOf('/') + 1)
            : images.filename,
      }
      setVideo(video)
    })
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
        end_date: date,
      }
      if (listMedia.length !== 0) {
        const formData = new FormData()
        listMedia.forEach(item => {
          if (item.typeMedia === MEDIA_TYPE.IMAGE) {
            formData.append('image', {
              uri: item.uri,
              name: item.name,
              type: item.type,
            })
          } else if (item.typeMedia === MEDIA_TYPE.VIDEO) {
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
      const res = await requestUpdateSupportManage(payload)
      if (res?.code === API_STATUS.SUCCESS) {
        showMessages(R.strings().notification, 'Cập nhật hoàn thành!', () => {
          NavigationUtil.navigate(SCREEN_ROUTER_APP.MANAGE_LIST_SUPPORT, {
            pageList: 2,
          })
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
