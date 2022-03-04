import { APP_SLICE, ROOT_STACK, SCREEN_ROUTER } from '@app/constant/Constant'
import SplashScreen from '@app/screens/SplashScreen'
import { NavigationContainer } from '@react-navigation/native'
import {
  createStackNavigator,
  StackHeaderInterpolationProps,
} from '@react-navigation/stack'
import React, { memo } from 'react'
import isEqual from 'react-fast-compare'
import { connect } from 'react-redux'
import NavigationUtil from './NavigationUtil'
import { StackAppCustomerScreen } from './stack/StackApp'
import { StackAuthScreen } from './stack/StackAuth'
import { StackMainScreen } from './stack/BottomTabBar'

const RootStack = createStackNavigator()
const screenOptions = {
  headerShown: false,
  cardStyle: { backgroundColor: 'transparent' },
  cardOverlayEnabled: true,
  cardStyleInterpolator: ({
    current: { progress },
  }: StackHeaderInterpolationProps & any) => ({
    cardStyle: {
      opacity: progress.interpolate({
        inputRange: [0, 0.5, 0.9, 1],
        outputRange: [0, 0.25, 0.7, 1],
      }),
    },
    overlayStyle: {
      opacity: progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.5],
        extrapolate: 'clamp',
      }),
    },
  }),
}

const renderSwitch = (switchApp: string) => {
  switch (switchApp) {
    case SCREEN_ROUTER.SPLASH:
      return (
        <RootStack.Screen
          name={SCREEN_ROUTER.SPLASH}
          component={SplashScreen}
        />
      )
    case SCREEN_ROUTER.AUTH:
      return (
        <RootStack.Screen
          name={SCREEN_ROUTER.AUTH}
          component={StackAuthScreen}
        />
      )
    case SCREEN_ROUTER.MAIN:
      return (
        <>
          <RootStack.Screen
            name={SCREEN_ROUTER.MAIN}
            component={StackMainScreen}
          />
          {StackAppCustomerScreen()}
        </>
      )
    default:
      break
  }
}

const AppNavigatorComponent = (props: any) => {
  return (
    <NavigationContainer
      ref={navigatorRef => {
        NavigationUtil.setTopLevelNavigator(navigatorRef)
      }}
    >
      <RootStack.Navigator
        headerMode="none"
        screenOptions={screenOptions}
        initialRouteName={ROOT_STACK.MAIN_APP}
        children={<>{renderSwitch(props?.switch)}</>}
      />
    </NavigationContainer>
  )
}

const AppNavigator = memo(AppNavigatorComponent, isEqual)
const mapStateToProps = (state: any) => ({
  switch: state[APP_SLICE.SWITCH].switch,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigator)
