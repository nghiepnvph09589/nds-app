import React, { Component } from 'react'
// import { StyleSheet } from 'react-native';
// import { connect } from 'react-redux';
import AppNavigator from './app/navigation/AppNavigator'
import { SafeAreaProvider } from 'react-native-safe-area-context'

// import OneSignalHelper from './app/utils/OneSignalHelper';

class AppContainer extends Component {
  // constructor(props) {
  //   super(props);
  //   OneSignalHelper.initialization('312321312372198372198');
  // }

  // componentWillUnmount() {
  //   OneSignalHelper.destruction();
  // }

  render() {
    return (
      <SafeAreaProvider>
        <AppNavigator />
      </SafeAreaProvider>
    )
  }
}

export default AppContainer

// const mapStateToProps = state => ({});

// const mapDispatchToProps = {};
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(AppContainer);

// const styles = StyleSheet.create({});
