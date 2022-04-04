import { Dispatch } from 'redux'
import OneSignal from 'react-native-onesignal'
import reactotron from 'reactotron-react-native'

export default abstract class OneSignalUtil {
  private static Dispatch: Dispatch
  static initialize(Dispatch: Dispatch) {
    this.Dispatch = Dispatch
    OneSignal.setLogLevel(6, 0)
    OneSignal.setAppId('db34fa73-c810-494c-b274-08ee6202a7ad')
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

  static onShow = async (notification: any) => {
    reactotron.log!('Prompt response:', notification?.notification)
  }
  static onOpened = (notification: any) => {
    reactotron.log!('Prompt response:', notification?.notification)
  }
}
