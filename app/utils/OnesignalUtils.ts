import {
  API_STATUS,
  NOTIFICATION_TYPE,
  ONESIGNAL_APP_ID,
  SCREEN_ROUTER_APP,
} from '@app/constant/Constant'
import {
  requestListNotificationThunk,
  setCountNotify,
} from '@app/screens/App/Notification/slice'

import AsyncStorageService from '@app/service/AsyncStorage/AsyncStorageService'
import { Dispatch } from 'redux'
import NavigationUtil from '@app/navigation/NavigationUtil'
import OneSignal from 'react-native-onesignal'
import reactotron from 'reactotron-react-native'
import { requestCountNotification } from '@app/screens/App/Notification/api'
import store from '@app/store'

export default abstract class OneSignalUtil {
  private static Dispatch: Dispatch
  static initialize(Dispatch: Dispatch) {
    this.Dispatch = Dispatch
    OneSignal.setLogLevel(6, 0)
    OneSignal.setAppId(ONESIGNAL_APP_ID)
    this.onPushNotification()
  }

  static onPushNotification() {
    OneSignal.promptForPushNotificationsWithUserResponse((response: any) => {
      reactotron.log!('Prompt response:', response)
    })
    OneSignal.setNotificationWillShowInForegroundHandler(this.onShow)
    OneSignal.setNotificationOpenedHandler(notification => {
      this.onOpened(notification?.notification)
    })
  }
  static getCountNotifyNotRead = async () => {
    const token = await AsyncStorageService.getToken()
    if (token) {
      const res = await requestCountNotification()
      if (res?.code === API_STATUS.SUCCESS) {
        await store.dispatch(setCountNotify(res?.data?.notification_not_seen))
      }
    }
  }
  static onShow = async (notification: any) => {
    // reactotron.log!('Prompt response:', notification?.notification)
    const body = {
      page: 1,
      limit: 15,
    }
    const token = await AsyncStorageService.getToken()
    token &&
      store.dispatch(requestListNotificationThunk({ body, loadOnTop: false }))
    token && this.getCountNotifyNotRead()
    reactotron.log!('Prompt response:', notification?.notification)
  }

  static onOpened = (notification: any) => {
    reactotron.log!('Prompt response:', notification?.notification)
    switch (notification?.additionalData?.type) {
      case NOTIFICATION_TYPE.DONATE:
        NavigationUtil.navigate(SCREEN_ROUTER_APP.DETAIL_SUPPORT_MANAGE, {
          id: notification?.additionalData?.notification_id,
          // customer: ROLE.CUSTOMER,
        })
        return
      case NOTIFICATION_TYPE.POST:
        NavigationUtil.navigate(SCREEN_ROUTER_APP.DETAIL_POST, {
          id: notification?.additionalData?.notification_id,
        })
        return
      case NOTIFICATION_TYPE.NEWS_BANNER:
        NavigationUtil.navigate(SCREEN_ROUTER_APP.BANNER_DETAIL, {
          id_banner: notification?.additionalData?.notification_id,
        })
        return
    }
  }
}
