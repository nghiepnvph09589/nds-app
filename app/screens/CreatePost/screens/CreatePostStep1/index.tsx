import R from '@app/assets/R'
import reactotron from '@app/config/ReactotronConfig'
import { useAppSelector } from '@app/store'
import { showMessages } from '@app/utils/AlertHelper'
import { hideLoading, showLoading } from '@app/utils/LoadingProgressRef'
import React, { useState, useRef, useEffect } from 'react'
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useDispatch } from 'react-redux'
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
      file_name: '',
      file_url: '',
      type: 1,
    },
  ])

  const dataCreatPost = useAppSelector(state => state.creatPostReducer)

  useEffect(() => {
    if (!dataCreatPost.content) {
      setTitle('')
      setContent('')
      MediaArray.current = []
    }
  }, [dataCreatPost])

  const handleNextStep1 = () => {
    if (!title) {
      showMessages(R.strings().notification, 'Vui lòng nhập tiêu đề')
      return
    }
    if (!content) {
      showMessages(R.strings().notification, 'Vui lòng nhập chia sẻ')
      return
    }
    if (!MediaArray?.current[0]?.file_url) {
      showMessages(
        R.strings().notification,
        'Vui lòng cập nhật hình ảnh/ video'
      )
      return
    }
    showLoading()
    const newMediaArray = MediaArray.current.map((item: ArrayImage) => ({
      media_url: item.file_url,
      type: item.type,
    }))
    dispatch(updateDataCreatePost({ title, content, media: newMediaArray }))
    hideLoading()
    onNext()
  }

  return (
    <>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
        style={styles.v_container}
      >
        <View>
          <InfoUser
            avatar={userInfo?.profile_picture_url.replace(
              'http://',
              'https://'
            )}
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
    flex: 1,
  },
})
