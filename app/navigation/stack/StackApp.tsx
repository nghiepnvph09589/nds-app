import AddressMap from '@app/screens/App/CreatePost/screens/AddressMap'
import BannerDetailScreen from '@app/screens/App/Home/screens/BannerDetail'
import ChangePassScreen from '@app/screens/App/Account/screens/ChangePassword'
import ContactScreen from '@app/screens/App/Account/screens/Contact'
import CreatePost from '@app/screens/App/CreatePost'
import CreateSupportScreen from '@app/screens/App/Support/CreateSupport'
import DetailSupportManage from '@app/screens/App/Support/DetailSupportManage'
import EditSupportScreen from '@app/screens/App/Support/EditSupportManage'
import InfoBank from '@app/screens/App/Account/screens/InfoBank'
import ListPostUser from '@app/screens/App/Account/screens/ListPostUser'
import ListSupportDetailScreen from '@app/screens/App/Support/ListSupportDetail'
import ListSupportScreen from '@app/screens/App/Support/ListSupported'
import ManageListPost from '@app/screens/App/Account/screens/ManageListPost'
import ManageListSupportScreen from '@app/screens/App/Support/ManageListSupport'
import NotificationScreen from '@app/screens/App/Notification'
import PostDetail from '@app/screens/App/Account/screens/PostDetail'
import React from 'react'
import { SCREEN_ROUTER_APP } from '@app/constant/Constant'
import SupportDetailScreen from '@app/screens/App/Support/SupportDetail'
import TermsScreen from '@app/screens/App/Account/screens/Terms'
import UpdateAccountScreen from '@app/screens/App/Account/screens/UpdateAccount'
import UpdateBank from '@app/screens/App/Account/screens/InfoBank/UpdateBank'
import UpdatePost from '@app/screens/App/UpdatePost'
import UpdateSupportManage from '@app/screens/App/Support/UpdateSupportManage'
import { createStackNavigator } from '@react-navigation/stack'
import HumanAddress from '@app/screens/App/HumanAddress'
import FilterScreen from '@app/screens/App/HumanAddress/screens/FilterScreen'
const {
  NOTIFICATION,
  UPDATE_ACCOUNT,
  LIST_SUPPORT,
  CONTACT,
  TERMS,
  CHANGE_PASS,
  ADDRESS_MAP,
  CREATE_SUPPORT,
  MANAGE_LIST_SUPPORT,
  MANAGE_LIST_POST,
  LIST_SUPPORT_DETAIL,
  LIST_POST,
  SUPPORT_DETAIL,
  DETAIL_POST,
  DETAIL_SUPPORT_MANAGE,
  CREATE_POST,
  EDIT_SUPPORT_MANAGE,
  UPDATE_SUPPORT_MANAGE,
  BANNER_DETAIL,
  UPDATE_POST,
  BANK_INFO,
  UPDATE_BANK,
  HUMAN_ADDRESS,
  FILTER,
} = SCREEN_ROUTER_APP
const Stack = createStackNavigator()

const mainScreen = {
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
  [LIST_POST]: ListPostUser,
  [SUPPORT_DETAIL]: SupportDetailScreen,
  [DETAIL_POST]: PostDetail,
  [DETAIL_SUPPORT_MANAGE]: DetailSupportManage,
  [CREATE_POST]: CreatePost,
  [MANAGE_LIST_POST]: ManageListPost,
  [EDIT_SUPPORT_MANAGE]: EditSupportScreen,
  [UPDATE_SUPPORT_MANAGE]: UpdateSupportManage,
  [BANNER_DETAIL]: BannerDetailScreen,
  [UPDATE_POST]: UpdatePost,
  [BANK_INFO]: InfoBank,
  [UPDATE_BANK]: UpdateBank,
  [HUMAN_ADDRESS]: HumanAddress,
  [FILTER]: FilterScreen,
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
