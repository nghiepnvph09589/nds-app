import * as Yup from 'yup'

import {
  Dimensions,
  ImageBackground,
  Keyboard,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import {
  PHONE_REGEX,
  SCREEN_ROUTER,
  SCREEN_ROUTER_AUTH,
} from '@app/constant/Constant'
import React, { useEffect, useRef, useState } from 'react'
import { colors, fonts } from '@app/theme'
import { hideLoading, showLoading } from '@app/utils/LoadingProgressRef'

import AsyncStorageService from '@app/service/AsyncStorage/AsyncStorageService'
import { Formik } from 'formik'
import FstImage from '@app/components/FstImage'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import LoginApi from './api/LoginApi'
import NavigationUtil from '@app/navigation/NavigationUtil'
import OneSignal from 'react-native-onesignal'
import R from '@app/assets/R'
import RNButton from '@app/components/RNButton/RNButton'
import RNTextInput from '@app/components/RNTextInput'
import { isIphoneX } from 'react-native-iphone-x-helper'
import { navigateSwitch } from '@app/navigation/switchNavigatorSlice'
import { useDispatch } from 'react-redux'

const { width } = Dimensions.get('window')

const LoginScreen = () => {
  const dispatch = useDispatch()
  const scrollRef = useRef<KeyboardAwareScrollView>(null)
  const LoginSchema = Yup.object().shape({
    phone: Yup.string()
      .matches(PHONE_REGEX, R.strings().validatePhone)
      .min(10, R.strings().validatePhone)
      .max(11, R.strings().validatePhone)
      .required(R.strings().phone_blank),
  })
  const [deviceID, setDeviceID] = useState<undefined | string>()
  const getDeviceID = async () => {
    const deviceState = await OneSignal.getDeviceState()
    setDeviceID(deviceState?.userId)
  }
  useEffect(() => {
    getDeviceID()
    Keyboard.addListener('keyboardDidShow', keyboardDidShow)
    return () => {
      Keyboard.removeListener('keyboardDidShow', keyboardDidShow)
    }
  }, [])

  const keyboardDidShow = () => {
    scrollRef.current?.scrollToEnd(true)
  }
  const handleLogin = async (item: { phone: string }) => {
    try {
      showLoading()
      const res = await LoginApi.checkAccount({ user_name: item.phone })
      console.log(res)
      if (res.data.type === 0) {
        hideLoading()
        NavigationUtil.navigate(SCREEN_ROUTER_AUTH.REGISTER, {
          phone: item.phone,
        })
      } else if (res.data.type === 1) {
        try {
          // eslint-disable-next-line no-shadow
          const res = await LoginApi.login({
            user_name: item.phone,
            password: item.phone,
            device_id: deviceID,
          })
          hideLoading()
          await AsyncStorageService.putToken(res?.data?.token)
          dispatch(navigateSwitch(SCREEN_ROUTER.MAIN))
        } catch (error) {
          hideLoading()
        }
      } else if (res.data.type === 2) {
        hideLoading()
        NavigationUtil.navigate(SCREEN_ROUTER_AUTH.LOGIN_STEP_2, {
          phone: item.phone,
        })
      }
    } catch (error) {
    } finally {
      hideLoading()
    }
  }
  return (
    <>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <View style={styles.v_keyboard}>
        <ImageBackground
          resizeMode="cover"
          style={styles.img_background}
          source={R.images.img_login}
        >
          <KeyboardAwareScrollView
            ref={scrollRef}
            keyboardShouldPersistTaps="always"
            showsVerticalScrollIndicator={false}
          >
            <FstImage
              style={styles.img_red_cross}
              source={R.images.img_red_cross}
            />
            <View style={styles.v_container}>
              <Text style={styles.txt_login}>{R.strings().login}</Text>
              <Text style={styles.txt_note}>{R.strings().note_phone}</Text>
              <Formik
                initialValues={{ phone: '' }}
                onSubmit={handleLogin}
                validationSchema={LoginSchema}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  setSubmitting,
                  values,
                  errors,
                  touched,
                }) => (
                  <>
                    <RNTextInput
                      returnKeyType={'done'}
                      containerStyle={styles.v_input}
                      placeholder={R.strings().phone}
                      leftIcon={R.images.ic_phone}
                      onChangeText={handleChange('phone')}
                      onBlur={handleBlur('phone')}
                      onSubmitEditing={() => setSubmitting(true)}
                      value={values.phone}
                      errorMessage={errors.phone}
                      touched={touched.phone}
                      keyboardType="number-pad"
                    />
                    <RNButton
                      icon
                      onPress={handleSubmit}
                      style={styles.v_button}
                      title={R.strings().next}
                    />
                  </>
                )}
              </Formik>
            </View>
            <TouchableOpacity
              style={styles.v_back}
              onPress={() => {
                dispatch(navigateSwitch(SCREEN_ROUTER.MAIN))
              }}
              children={
                <FstImage
                  source={R.images.ic_exit}
                  style={styles.ic_back}
                  resizeMode="contain"
                />
              }
            />
          </KeyboardAwareScrollView>
        </ImageBackground>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  ic_back: {
    width: 40,
    height: 40,
  },
  v_back: {
    alignSelf: 'center',
    marginBottom: 40,
  },
  v_input: {
    marginTop: 39,
    marginBottom: 44,
  },
  v_keyboard: {
    flex: 1,
    backgroundColor: 'white',
  },
  img_background: { width: '100%', height: '100%' },
  img_red_cross: {
    width: 156,
    aspectRatio: 1,
    marginTop: isIphoneX() ? 51 : 20,
    alignSelf: 'center',
  },
  v_container: {
    width: width * 0.8,
    backgroundColor: '#FFFFFF10',
    borderColor: '#FFFFFF37',
    borderWidth: 1,
    marginTop: 27,
    alignSelf: 'center',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 24,
  },
  txt_note: {
    ...fonts.regular16,
    color: '#FFB7B7',
    marginTop: 37,
    marginHorizontal: 42,
    textAlign: 'center',
  },
  txt_login: {
    ...fonts.semi_bold24,
    color: 'white',
    marginTop: 36,
    textAlign: 'center',
  },
  v_button: {
    marginBottom: 40,
  },
})

export default LoginScreen
