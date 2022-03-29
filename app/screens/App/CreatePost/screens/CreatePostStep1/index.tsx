import R from '@app/assets/R'
import reactotron from '@app/config/ReactotronConfig'
import { MEDIA_TYPE } from '@app/constant/Constant'
import { useAppSelector } from '@app/store'
import { showMessages } from '@app/utils/AlertHelper'
import { hideLoading, showLoading } from '@app/utils/LoadingProgressRef'
import React, { useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useDispatch } from 'react-redux'
import CreatePostApi from '../../api/CreatePostApi'
import ViewBottom from '../../components/ViewBottom'
import { ArrayImage } from '../../model'
import { updateDataCreatePost } from '../../slice/CreatePostSlice'
import ImageArea from './components/ImageArea'
import InfoUser from './components/InfoUser'
import InputPost from './components/InputPost'

interface CreatPostStep1Props {
  onBack: () => void
  onNext: () => void
}

const CreatPostStep1 = (props: CreatPostStep1Props) => {
  const dispatch = useDispatch()
  const { onBack, onNext } = props
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const userInfo = useAppSelector(state => state.accountReducer.data)
  const MediaArray = useRef<ArrayImage[]>([
    {
      uri: '',
      name: '',
      type: '',
      typeMedia: 1,
    },
  ])
  const scrollRef = useRef<KeyboardAwareScrollView>(null)

  const handleNextStep1 = async () => {
    if (!title) {
      showMessages(R.strings().notification, 'Vui lòng nhập tiêu đề')
      return
    }
    if (!content) {
      showMessages(R.strings().notification, 'Vui lòng nhập chia sẻ')
      return
    }
    if (!MediaArray?.current[0]?.uri) {
      showMessages(
        R.strings().notification,
        'Vui lòng cập nhật hình ảnh/ video'
      )
      return
    }
    showLoading()
    reactotron.log!(MediaArray)
    const formData = new FormData()
    MediaArray.current.forEach(item => {
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
    try {
      const res = await CreatePostApi.uploadMultiFile(formData)
      const newMediaArray = res.data.array_image_name
        .map((item: { file_url: string; file_name: string }) => ({
          media_url: item.file_name,
          type: MEDIA_TYPE.IMAGE,
        }))
        .concat(
          res.data.array_video_name.map(
            (item: { file_url: string; file_name: string }) => ({
              media_url: item.file_name,
              type: MEDIA_TYPE.VIDEO,
            })
          )
        )
      dispatch(updateDataCreatePost({ title, content, media: newMediaArray }))
      onNext()
    } catch (error) {
    } finally {
      hideLoading()
    }
  }

  return (
    <>
      <KeyboardAwareScrollView
        ref={scrollRef}
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
        style={styles.v_container}
        enableAutomaticScroll
        onKeyboardDidShow={(frames: Object) => {
          console.log(frames)
        }}
      >
        <View>
          <InfoUser
            avatar={
              userInfo?.profile_picture_url
                ? userInfo?.profile_picture_url.replace('http://', 'https://')
                : ''
            }
            title={title}
            setTitle={setTitle}
          />
          <InputPost content={content} setContent={setContent} />
        </View>
        <ImageArea
          onPress={(mediaArray: ArrayImage[]) => {
            MediaArray.current = mediaArray
          }}
        />
      </KeyboardAwareScrollView>
      <ViewBottom
        onBack={() => {
          onBack()
        }}
        onNext={handleNextStep1}
      />
    </>
  )
}

export default CreatPostStep1

const styles = StyleSheet.create({
  v_container: {
    marginTop: 1,
  },
})
