import ChangePassScreen from '@app/screens/App/Account/screens/ChangePassword'
import ContactScreen from '@app/screens/App/Account/screens/Contact'
import ListSupportScreen from '@app/screens/App/Account/screens/ListSupport'
import NotificationScreen from '@app/screens/App/Notification/NotificationScreen'
import ProductScreen from '@app/screens/App/Product/ProductScreen'
import React from 'react'
import { SCREEN_ROUTER_APP } from '@app/constant/Constant'
import TermsScreen from '@app/screens/App/Account/screens/Terms'
import UpdateAccountScreen from '@app/screens/App/Account/screens/UpdateAccount'
import { createStackNavigator } from '@react-navigation/stack'
import AddressMap from '@app/screens/App/CreatePost/screens/AddressMap'

const {
  PRODUCT,
  NOTIFICATION,
  UPDATE_ACCOUNT,
  LIST_SUPPORT,
  CONTACT,
  TERMS,
  CHANGE_PASS,
  ADDRESS_MAP,
} = SCREEN_ROUTER_APP
const Stack = createStackNavigator()

const mainScreen = {
  [PRODUCT]: ProductScreen,
  [NOTIFICATION]: NotificationScreen,
  [UPDATE_ACCOUNT]: UpdateAccountScreen,
  [LIST_SUPPORT]: ListSupportScreen,
  [CONTACT]: ContactScreen,
  [TERMS]: TermsScreen,
  [CHANGE_PASS]: ChangePassScreen,
  [ADDRESS_MAP]: AddressMap,
}

export const StackAppCustomerScreen = () => {
  return (
    <>
      {Object.keys(mainScreen).map((item, index) => (
        <Stack.Screen key={index} name={item} component={mainScreen[item]} />
      ))}
    </>
  )
}
