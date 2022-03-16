import { useAppSelector } from '@app/store'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import ButtonImage from './components/ButtonImage'
import InfoUser from './components/InfoUser'
import InputPost from './components/InputPost'

const CreatPostStep1 = () => {
  const userInfo = useAppSelector(state => state.accountReducer.data)
  return (
    <>
      <View style={styles.v_container}>
        <InfoUser
          avatar={userInfo.profile_picture_url.replace('http://', 'https://')}
        />
        <InputPost />
      </View>
      <ButtonImage />
    </>
  )
}

export default CreatPostStep1

const styles = StyleSheet.create({
  v_container: {
    backgroundColor: 'white',
    marginTop: 2,
    paddingBottom: 44,
  },
})
