import R from '@app/assets/R'
import { SCREEN_ROUTER, SCREEN_ROUTER_APP } from '@app/constant/Constant'
import { navigateSwitch } from '@app/navigation/switchNavigatorSlice'
import AccountScreen from '@app/screens/App/Account/AccountScreen'
import CartScreen from '@app/screens/App/Cart/CartScreen'
import HomeScreen from '@app/screens/App/Home/HomeScreen'
import ProductScreen from '@app/screens/App/Product/ProductScreen'
import { colors } from '@app/theme'
import { showConfirm } from '@app/utils/AlertHelper'
import AsyncStorage from '@react-native-community/async-storage'
import {
  BottomTabBar,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import FastImage from 'react-native-fast-image'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { useDispatch } from 'react-redux'
import reactotron from 'reactotron-react-native'
import StackBottomBar from './StackBottomBar'
const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()
const {
  ic_home,
  ic_product,
  ic_cart,
  ic_profile,
  ic_profile_focus,
  ic_home_focus,
  ic_cart_focus,
} = R.images

const { HOME, PRODUCT, CART, USER } = SCREEN_ROUTER_APP

const tabBarIcon = {
  [HOME]: ic_home,
  [PRODUCT]: ic_product,
  [CART]: ic_cart,
  [USER]: ic_profile,
}

const tabBarIconFocus = {
  [HOME]: ic_home_focus,
  [PRODUCT]: ic_home_focus,
  [CART]: ic_cart_focus,
  [USER]: ic_profile_focus,
}

const tabBarLabel = {
  [HOME]: R.strings().home,
  [PRODUCT]: R.strings().product,
  [CART]: R.strings().cart,
  [USER]: R.strings().account,
}

const styles = StyleSheet.create({
  tab_bar_icon: {
    width: 20,
    height: 20,
  },
  txtLabel: {
    fontSize: 20,
  },
})

const MainTab = (route: any) => {
  const dispatch = useDispatch()
  const routeName = getFocusedRouteNameFromRoute(route)
  reactotron.log!('routeName', routeName)
  return (
    <Tab.Navigator
      tabBarOptions={{
        keyboardHidesTabBar: false,
        tabStyle: { flexDirection: 'column' },
      }}
      tabBar={props => (
        <BottomTabBar
          {...props}
          style={{
            height: 60 + getBottomSpace(),
          }}
        />
      )}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          const sizeIcon = focused ? 25 : 22
          return (
            <FastImage
              tintColor={focused ? '#FE724C' : ''}
              style={{ width: sizeIcon, height: sizeIcon }}
              source={
                focused ? tabBarIconFocus[route.name] : tabBarIcon[route.name]
              }
              resizeMode={'contain'}
            />
          )
        },
        tabBarLabel: ({ focused }) => {
          const color = focused ? colors.primary : colors.focus
          return (
            <Text
              style={[
                styles.txtLabel,
                {
                  color: color,
                  fontSize: 12,
                },
              ]}
              numberOfLines={1}
            >
              {tabBarLabel[route.name]}
            </Text>
          )
        },
        tabBarButton: props => {
          return (
            <TouchableOpacity
              {...props}
              onPress={async e => {
                const token = await AsyncStorage.getItem('token')
                if (route.name === SCREEN_ROUTER_APP.USER && !token) {
                  showConfirm(
                    R.strings().notification,
                    R.strings().please_login,
                    () => {
                      dispatch(navigateSwitch(SCREEN_ROUTER.AUTH))
                    }
                  )
                  return
                }
                if (props.onPress) props.onPress(e)
              }}
            />
          )
        },
      })}
    >
      {Object.keys(StackBottomBar).map((elem, index) => (
        <Tab.Screen key={index} name={elem} component={StackBottomBar[elem]} />
      ))}
    </Tab.Navigator>
  )
}
export const StackMainScreen = () => (
  <Stack.Navigator
    headerMode="none"
    children={
      <>
        <Stack.Screen name={SCREEN_ROUTER.MAIN} component={MainTab} />
      </>
    }
  />
)
