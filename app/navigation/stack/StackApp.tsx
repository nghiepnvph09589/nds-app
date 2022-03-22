import AddressMap from '@app/screens/CreatePost/screens/AddressMap'
import ChangePassScreen from '@app/screens/App/Account/screens/ChangePassword'
import ContactScreen from '@app/screens/App/Account/screens/Contact'
import CreateSupportScreen from '@app/screens/App/Home/screens/CreateSupport'
import ListPost from '@app/screens/App/Account/screens/ListPost'
import ListSupportDetailScreen from '@app/screens/App/Account/screens/ListSuppotDetail'
import ListSupportScreen from '@app/screens/App/Account/screens/ListSupport'
import ManageListSupportScreen from '@app/screens/App/Account/screens/ManageListSupport'
import NotificationScreen from '@app/screens/App/Notification/NotificationScreen'
import ProductScreen from '@app/screens/App/Product/ProductScreen'
import React from 'react'
import { SCREEN_ROUTER_APP } from '@app/constant/Constant'
import TermsScreen from '@app/screens/App/Account/screens/Terms'
import UpdateAccountScreen from '@app/screens/App/Account/screens/UpdateAccount'
import { createStackNavigator } from '@react-navigation/stack'

const {
  PRODUCT,
  NOTIFICATION,
  UPDATE_ACCOUNT,
  LIST_SUPPORT,
  CONTACT,
  TERMS,
  CHANGE_PASS,
  ADDRESS_MAP,
  CREATE_SUPPORT,
  MANAGE_LIST_SUPPORT,
  LIST_SUPPORT_DETAIL,
  LIST_POST,
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
  [CREATE_SUPPORT]: CreateSupportScreen,
  [MANAGE_LIST_SUPPORT]: ManageListSupportScreen,
  [LIST_SUPPORT_DETAIL]: ListSupportDetailScreen,
  [LIST_POST]: ListPost,
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
