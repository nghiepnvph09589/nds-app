import R from '@app/assets/R'
import FstImage from '@app/components/FstImage'
import RNButton from '@app/components/RNButton/RNButton'
import RNTextInput from '@app/components/RNTextInput'
import ScreenWrapper from '@app/components/Screen/ScreenWrapper'
import reactotron from '@app/config/ReactotronConfig'
import { EMAIL_REGEX, SCREEN_ROUTER } from '@app/constant/Constant'
import { navigateSwitch } from '@app/navigation/switchNavigatorSlice'
import { colors, fonts } from '@app/theme'
import { showMessages } from '@app/utils/AlertHelper'
import { showLoading } from '@app/utils/LoadingProgressRef'
import { Formik } from 'formik'
import React, { memo, useState } from 'react'
import isEqual from 'react-fast-compare'
import { Platform, StyleSheet, TouchableOpacity } from 'react-native'
import { launchImageLibrary } from 'react-native-image-picker'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
const ForgetPasswordScreenComponent = () => {
  const dispatch = useDispatch()
  const [profileImage, setProfileImage] = useState<string>('')
  const RegisterSchema = Yup.object().shape({
    name: Yup.string().required(R.strings().name_blank),
    email: Yup.string()
      .matches(EMAIL_REGEX, R.strings().validateEmail)
      .required(R.strings().email_blank),
    address: Yup.string().required(R.strings().address_blank),
  })
  const _onSubmit = () => {
    if (!profileImage) {
      showMessages(R.strings().notification, 'Vui lòng cập nhật ảnh đại diện')
      return
    }
    dispatch(navigateSwitch(SCREEN_ROUTER.MAIN))
  }
  return (
    <ScreenWrapper
      back
      unsafe
      color={colors.text}
      backgroundHeader="white"
      forceInset={['left']}
      titleHeader={R.strings().register}
      children={
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="always"
          style={styles.v_keyboard}
          enableOnAndroid={true}
          //enableAutomaticScroll={false}
        >
          <Avatar
            onPress={(url: string) => {
              setProfileImage(url)
            }}
            url={profileImage}
          />
          <Formik
            initialValues={{ name: '', email: '', address: '' }}
            onSubmit={_onSubmit}
            validationSchema={RegisterSchema}
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
                  containerStyle={styles.v_container_input}
                  errorStyle={styles.txt_error}
                  returnKeyType={'next'}
                  inputContainerStyle={styles.v_input}
                  placeholder={R.strings().full_name}
                  leftIcon={R.images.ic_user}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  onSubmitEditing={() => setSubmitting(true)}
                  value={values.name}
                  errorMessage={errors.name}
                  touched={touched.name}
                />
                <RNTextInput
                  containerStyle={styles.v_container_input}
                  errorStyle={styles.txt_error}
                  returnKeyType={'next'}
                  inputContainerStyle={styles.v_input}
                  placeholder={R.strings().email}
                  leftIcon={R.images.ic_email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  onSubmitEditing={() => setSubmitting(true)}
                  value={values.email}
                  errorMessage={errors.email}
                  touched={touched.email}
                />
                <RNTextInput
                  containerStyle={styles.v_container_input}
                  errorStyle={styles.txt_error}
                  returnKeyType={'done'}
                  inputContainerStyle={styles.v_input}
                  placeholder={R.strings().address}
                  leftIcon={R.images.ic_location}
                  onChangeText={handleChange('address')}
                  onBlur={handleBlur('address')}
                  onSubmitEditing={() => setSubmitting(true)}
                  value={values.address}
                  errorMessage={errors.address}
                  touched={touched.address}
                />
                <RNButton
                  onPress={handleSubmit}
                  style={styles.v_button}
                  title={R.strings().register}
                />
              </>
            )}
          </Formik>
        </KeyboardAwareScrollView>
      }
    />
  )
}

interface AvatarProps {
  onPress: (url: string) => void
  url: string
}

const Avatar = ({ onPress, url }: AvatarProps) => {
  const selectImagePress = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 1,
        maxWidth: 800,
        maxHeight: 800,
      })
      reactotron.logImportant!(result)

      if (
        result.didCancel ||
        !result.assets?.length ||
        typeof result.assets[0].uri === 'undefined'
      ) {
        return
      }
      showLoading()
      const formData = new FormData()
      formData.append('image', {
        uri:
          Platform.OS === 'ios'
            ? result.assets[0].uri.replace('file://', '')
            : result.assets[0].uri,
        name: result.assets[0].fileName,
        type: result.assets[0].type,
      })
      onPress(
        Platform.OS === 'ios' ? result.assets[0].uri : result.assets[0].uri
      )
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <TouchableOpacity onPress={selectImagePress}>
      <FstImage
        source={url ? { uri: url } : R.images.img_avatar}
        // eslint-disable-next-line react-native/no-inline-styles
        style={[styleAvatar.avatar, { borderRadius: url ? 100 / 2 : 0 }]}
        resizeMode="cover"
      />
    </TouchableOpacity>
  )
}
// borderRadius: url ? 100 / 2 : 0,
const styleAvatar = StyleSheet.create({
  avatar: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 44,
    marginTop: 40,
  },
})

const styles = StyleSheet.create({
  v_keyboard: {
    flex: 1,
    backgroundColor: 'white',
  },
  v_note: {
    textAlign: 'center',
    ...fonts.regular16,
    color: colors.text,
    marginHorizontal: 20,
    marginTop: 35,
  },
  v_container_input: { marginHorizontal: 33, marginTop: 15 },
  v_input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
  },
  v_button: {
    marginHorizontal: 33,
    marginTop: 32,
    marginBottom: 50,
  },
  txt_error: {
    color: 'red',
  },
})
const Register = memo(ForgetPasswordScreenComponent, isEqual)

export default Register
