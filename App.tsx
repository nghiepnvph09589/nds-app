import React from 'react'
import AppContainer from './AppContainer'
import store from '@app/store'
import { Provider } from 'react-redux'
import codePush from 'react-native-code-push'
import { RNAlert } from '@app/components/RNAlert/RNAlert'
import { LoadingProgress } from '@app/components/Loading'
import { progressHolder } from '@app/utils/LoadingProgressRef'
const App = () => {
  return (
    <Provider store={store}>
      <AppContainer />
      <RNAlert />
      <LoadingProgress ref={progressHolder} />
    </Provider>
  )
}

let codePushOptions = { checkFrequency: codePush.CheckFrequency.MANUAL }
const MyApp = codePush(codePushOptions)(App)

export default MyApp
