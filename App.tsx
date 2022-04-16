import React, { Component } from 'react'

import { Alert } from 'react-native'
import AppContainer from './AppContainer'
import { LoadingProgress } from '@app/components/Loading'
import { Provider } from 'react-redux'
import { RNAlert } from '@app/components/RNAlert/RNAlert'
import Toast from 'react-native-toast-message'
import codePush from 'react-native-code-push'
import { progressHolder } from '@app/utils/LoadingProgressRef'
import store from '@app/store'

class App extends Component {
  codePushStatusDidChange(status: any) {
    switch (status) {
      case codePush.SyncStatus.CHECKING_FOR_UPDATE:
        break
      case codePush.SyncStatus.DOWNLOADING_PACKAGE:
        Toast.show({
          type: 'info',
          text1: 'Đang tải bản cập nhật mới',
          visibilityTime: 2000,
        })
        console.log('Downloading package.')
        break
      case codePush.SyncStatus.INSTALLING_UPDATE:
        break
      case codePush.SyncStatus.UP_TO_DATE:
        break
      case codePush.SyncStatus.UPDATE_INSTALLED:
        Alert.alert('Cập nhật thành công', 'Vui lòng khởi động lại ứng dụng', [
          {
            text: 'Đồng ý',
            onPress: () => {
              codePush.allowRestart()
              codePush.restartApp()
            },
          },
        ])
        break
    }
  }
  codePushDownloadDidProgress(progress: any) {
    console.log(
      progress.receivedBytes + ' of ' + progress.totalBytes + ' received.'
    )
  }
  componentDidMount() {
    codePush.disallowRestart()
  }
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
        <RNAlert />
        <Toast ref={ref => Toast.setRef(ref)} />
        <LoadingProgress ref={progressHolder} />
      </Provider>
    )
  }
}

let codePushOptions = {
  updateDialog: false,
  installMode: codePush.InstallMode.IMMEDIATE,
  checkFrequency: __DEV__
    ? codePush.CheckFrequency.MANUAL
    : codePush.CheckFrequency.ON_APP_RESUME,
}
const MyApp = codePush(codePushOptions)(App)

export default MyApp
