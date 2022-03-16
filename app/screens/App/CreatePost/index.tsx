import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '@app/components/Screen/ScreenWrapper'
import { colors } from '@app/theme'
import InfoUser from './components/InfoUser'
import R from '@app/assets/R'
import { useAppSelector } from '@app/store'
import InputPost from './components/InputPost'
import ViewBottom from './components/ViewBottom'
import ButtonPost from './components/ButtonPost'

const CreatePost = () => {
  const userInfo = useAppSelector(state => state.accountReducer.data)
  return (
    <ScreenWrapper
      back
      color={colors.text}
      backgroundHeader="white"
      forceInset={['left']}
      titleHeader={R.strings().create_post}
      rightComponent={<ButtonPost />}
      children={
        <>
          <View style={styles.v_container}>
            <View style={styles.line} />
            <InfoUser
              name={userInfo.name}
              avatar={userInfo.profile_picture_url.replace(
                'http://',
                'https://'
              )}
            />
            <InputPost />
          </View>
          <ViewBottom />
        </>
      }
    />
  )
}

export default CreatePost

const styles = StyleSheet.create({
  v_container: {
    flex: 1,
    backgroundColor: 'white',
  },
  line: {
    backgroundColor: colors.backgroundColor,
    height: 1.5,
  },
})
