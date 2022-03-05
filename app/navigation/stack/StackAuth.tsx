import { SCREEN_ROUTER_AUTH } from '@app/constant/Constant'
import ChangePassWordScreen from '@app/screens/Auth/ChangePassword'
import ForgetPassword from '@app/screens/Auth/FogetPassword'
import ForgetPasswordStep2 from '@app/screens/Auth/FogetPassword/ForgetPasswordStep2'
import LoginScreen from '@app/screens/Auth/Login'
import LoginStep2 from '@app/screens/Auth/Login/LoginStep2'
import Register from '@app/screens/Auth/Register'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

const {
  LOGIN,
  FORGET_PASSWORD,
  CHANGE_PASSWORD,
  REGISTER,
  LOGIN_STEP_2,
  FORGET_PASSWORD_STEP_2,
} = SCREEN_ROUTER_AUTH
const Stack = createStackNavigator()

const mainScreen = {
  [LOGIN]: LoginScreen,
  [LOGIN_STEP_2]: LoginStep2,
  [REGISTER]: Register,
  [FORGET_PASSWORD]: ForgetPassword,
  [FORGET_PASSWORD_STEP_2]: ForgetPasswordStep2,
  [CHANGE_PASSWORD]: ChangePassWordScreen,
}

export const StackAuthScreen = () => {
  return (
    <>
      <Stack.Navigator headerMode="none">
        {Object.keys(mainScreen).map((item, index) => (
          <Stack.Screen key={index} name={item} component={mainScreen[item]} />
        ))}
      </Stack.Navigator>
    </>
  )
}
