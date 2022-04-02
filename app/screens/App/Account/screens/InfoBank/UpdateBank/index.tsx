import R from '@app/assets/R'
import RNButton from '@app/components/RNButton/RNButton'
import RNTextInput from '@app/components/RNTextInput'
import ScreenWrapper from '@app/components/Screen/ScreenWrapper'
import { NAME_REGEX, SCREEN_ROUTER_AUTH } from '@app/constant/Constant'
import NavigationUtil from '@app/navigation/NavigationUtil'
import { colors, fonts } from '@app/theme'
import { hideLoading, showLoading } from '@app/utils/LoadingProgressRef'
import { Formik } from 'formik'
import React, { memo } from 'react'
import isEqual from 'react-fast-compare'
import { StyleSheet } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as Yup from 'yup'

interface ChangePassProps {
  route: { params: { user_id: string } }
}

const UpdateBankComponent = (props: ChangePassProps) => {
  const UpdateBankSchema = Yup.object().shape({
    accountName: Yup.string()
      .trim()
      .matches(NAME_REGEX, 'Tên tài khoản sai định dạng')
      .required('Tên tài khoản đang để trống'),
    accountNumber: Yup.string().trim().required('Số tài khoản đang để trống'),
    branchName: Yup.string()
      .trim()
      .required('Chi nhánh ngân hàng đang để trống'),
  })
  const _onSubmit = async (item: {
    accountName: string
    accountNumber: string
    branchName: string
  }) => {
    // if (item.password !== item.confirmPassword) {
    //   showMessages(
    //     R.strings().notification,
    //     R.strings().confirm_password_not_success
    //   )
    //   return
    // }
    try {
      showLoading()
      // await ChangePassApi.changePass({
      //   user_id: props.route.params.user_id,
      //   new_password: item.password,
      // })
      hideLoading()
      NavigationUtil.navigate(SCREEN_ROUTER_AUTH.LOGIN)
    } catch (error) {
      hideLoading()
    }
  }
  return (
    <ScreenWrapper
      back
      color={colors.text}
      backgroundHeader="white"
      forceInset={['left']}
      titleHeader={'Sửa tài khoản ngân hàng'}
      children={
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="always"
          style={styles.v_keyboard}
        >
          <Formik
            initialValues={{
              accountName: '',
              accountNumber: '',
              branchName: '',
            }}
            onSubmit={_onSubmit}
            validationSchema={UpdateBankSchema}
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
                  returnKeyType={'done'}
                  inputContainerStyle={styles.v_input}
                  placeholder={'Chủ tài khoản'}
                  onChangeText={handleChange('accountName')}
                  onBlur={handleBlur('accountName')}
                  onSubmitEditing={() => setSubmitting(true)}
                  value={values.accountName}
                  errorMessage={errors.accountName}
                  touched={touched.accountName}
                />
                <RNTextInput
                  containerStyle={styles.v_container_input2}
                  errorStyle={styles.txt_error}
                  returnKeyType={'done'}
                  inputContainerStyle={styles.v_input}
                  placeholder={'Số tài khoản'}
                  onChangeText={handleChange('accountNumber')}
                  onBlur={handleBlur('accountNumber')}
                  onSubmitEditing={() => setSubmitting(true)}
                  value={values.accountNumber}
                  errorMessage={errors.accountNumber}
                  touched={touched.accountNumber}
                />
                <RNTextInput
                  containerStyle={styles.v_container_input2}
                  errorStyle={styles.txt_error}
                  returnKeyType={'done'}
                  inputContainerStyle={styles.v_input}
                  placeholder={'Chi nhánh'}
                  onChangeText={handleChange('branchName')}
                  onBlur={handleBlur('branchName')}
                  onSubmitEditing={() => setSubmitting(true)}
                  value={values.branchName}
                  errorMessage={errors.branchName}
                  touched={touched.branchName}
                />
                <RNButton
                  onPress={handleSubmit}
                  style={styles.v_button}
                  title={R.strings().confirm}
                />
              </>
            )}
          </Formik>
        </KeyboardAwareScrollView>
      }
    />
  )
}

const styles = StyleSheet.create({
  v_keyboard: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 15,
  },
  v_note: {
    textAlign: 'center',
    ...fonts.regular16,
    color: colors.text,
    marginHorizontal: 67,
    marginTop: 35,
  },
  v_container_input: { marginTop: 20 },
  v_container_input2: { marginTop: 16 },
  v_input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
  },
  v_button: {
    marginTop: 32,
  },
  txt_error: {
    color: 'red',
  },
})
const UpdateBank = memo(UpdateBankComponent, isEqual)

export default UpdateBank
