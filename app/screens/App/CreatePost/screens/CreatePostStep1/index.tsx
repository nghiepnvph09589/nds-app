import { useAppSelector } from '@app/store'
import React from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import ViewBottom from '../../components/ViewBottom'
import ImageArea from './components/ImageArea'
import InfoUser from './components/InfoUser'
import InputPost from './components/InputPost'

interface CreatPostStep1Props {
  onBack: () => void
  onNext: () => void
}

const CreatPostStep1 = (props: CreatPostStep1Props) => {
  const { onBack, onNext } = props
  const userInfo = useAppSelector(state => state.accountReducer.data)
  return (
    <>
      <ScrollView style={styles.v_container}>
        <View>
          <InfoUser
            avatar={userInfo.profile_picture_url.replace('http://', 'https://')}
          />
          <InputPost />
        </View>
        <ImageArea />
      </ScrollView>
      <ViewBottom onBack={onBack} onNext={onNext} />
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
