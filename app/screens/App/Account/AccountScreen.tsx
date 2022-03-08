import ScreenWrapper from '@app/components/Screen/ScreenWrapper'
import { SCREEN_ROUTER } from '@app/constant/Constant'
import { navigateSwitch } from '@app/navigation/switchNavigatorSlice'
import AsyncStorageService from '@app/service/AsyncStorage/AsyncStorageService'
import React, { useEffect } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'

const AccountScreen = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    return () => {}
  }, [])
  return (
    <ScreenWrapper
      backgroundColor="#F5F5F5"
      children={
        <>
          <TouchableOpacity
            onPress={async () => {
              await AsyncStorageService.putToken('')
              dispatch(navigateSwitch(SCREEN_ROUTER.AUTH))
            }}
          >
            <Text>Logout</Text>
          </TouchableOpacity>
        </>
      }
    />
  )
}

export default AccountScreen
