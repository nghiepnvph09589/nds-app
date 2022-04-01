import R from '@app/assets/R'
import reactotron from '@app/config/ReactotronConfig'
import { useAppSelector } from '@app/store'
import { showMessages } from '@app/utils/AlertHelper'
import React, { useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useDispatch } from 'react-redux'
import ViewBottom from '../../components/ViewBottom'
import { Media } from '../../model'
import { updateDataPost } from '../../slice/UpdatePostSlice'
import ImageArea from './components/ImageArea'
import InfoUser from './components/InfoUser'
import InputPost from './components/InputPost'

interface UpdatePostStep1Props {
  onBack: () => void
  onNext: () => void
}

const UpdatePostStep1 = (props: UpdatePostStep1Props) => {
  const dispatch = useDispatch()
  const dataPost = useAppSelector(state => state.updatePostReducer)
  const { onBack, onNext } = props
  const [title, setTitle] = useState<string>(dataPost.title)
  const [content, setContent] = useState<string>(dataPost.content)
  const userInfo = useAppSelector(state => state.accountReducer.data)
  const MediaArray = useRef<Media[]>(dataPost.new_media)
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
    if (!MediaArray?.current[0]?.url) {
      showMessages(
        R.strings().notification,
        'Vui lòng cập nhật hình ảnh/ video'
      )
      return
    }

    reactotron.log!(MediaArray)
    dispatch(updateDataPost({ title, content, new_media: MediaArray.current }))
    onNext()
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
          onPress={(mediaArray: Media[]) => {
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

export default UpdatePostStep1

const styles = StyleSheet.create({
  v_container: {
    marginTop: 1,
  },
})
