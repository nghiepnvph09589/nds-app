import {
  BottomTabBar,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import {
  MAIN_TAB,
  ROLE,
  SCREEN_ROUTER,
  SCREEN_ROUTER_APP,
} from '@app/constant/Constant'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { getBottomSpace, isIphoneX } from 'react-native-iphone-x-helper'

import Account from '@app/screens/App/Account'
import AsyncStorage from '@react-native-community/async-storage'
import CreatePost from '@app/screens/App/CreatePost'
import FastImage from 'react-native-fast-image'
import FstImage from '@app/components/FstImage'
import Home from '@app/screens/App/Home'
import NavigationUtil from '../NavigationUtil'
import NotificationScreen from '@app/screens/App/Notification'
import R from '@app/assets/R'
import React from 'react'
import { colors, fonts } from '@app/theme'
import { createStackNavigator } from '@react-navigation/stack'
import { dimension } from '@app/constant/Theme'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'
import { navigateSwitch } from '@app/navigation/switchNavigatorSlice'
import reactotron from 'reactotron-react-native'
import { showConfirm } from '@app/utils/AlertHelper'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '@app/store'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

const { HOME, LOCATION, USER, CREATE_POST, NOTIFICATION } = MAIN_TAB

export const TAB_BAR = {
  [HOME]: {
    name: MAIN_TAB.HOME,
    icon: R.images.ic_home,
    route: Home,
    title: R.strings().home,
  },
  [LOCATION]: {
    name: MAIN_TAB.LOCATION,
    icon: R.images.ic_location3,
    route: NotificationScreen,
    title: R.strings().product,
  },
  [CREATE_POST]: {
    name: MAIN_TAB.CREATE_POST,
    icon: R.images.ic_create_post,
    route: CreatePost,
    title: 'QR Code',
  },
  [NOTIFICATION]: {
    name: MAIN_TAB.NOTIFICATION,
    icon: R.images.ic_noti,
    route: NotificationScreen,
    title: R.strings().notification,
  },
  [USER]: {
    name: MAIN_TAB.USER,
    icon: R.images.ic_user2,
    route: Account,
    title: R.strings().account,
  },
}

const isNotCreatPost = (title: string) => {
  return title !== TAB_BAR.CREATE_POST.title
}

const TabBarNameRequireLogin = [USER, CREATE_POST, NOTIFICATION]

const RenderTabBarIcon = ({
  focused,
  route,
}: {
  focused?: boolean
  route?: any
}) => {
  const tintColor = focused ? colors.primary : '#ADB5BD'
  const userInfo = useAppSelector(state => state.accountReducer.data)
  const count = userInfo.post + userInfo.donate
  return (
    <>
      {!isNotCreatPost(TAB_BAR[route.name].title) ? (
        <View style={styles.v_qrCode}>
          <FstImage
            resizeMode="contain"
            style={styles.image}
            source={R.images.ic_create_post}
          />
        </View>
      ) : (
        <>
          {route.name === MAIN_TAB.USER ? (
            <View>
              <FastImage
                style={styles.img_icon}
                tintColor={tintColor}
                source={TAB_BAR[route.name].icon}
                resizeMode={'contain'}
              />
              {!!count &&
                count !== 0 &&
                !focused &&
                userInfo.role !== ROLE.CUSTOMER &&
                userInfo.role !== ROLE.OFFICER_WARD && (
                  <View style={styles.v_dot}>
                    <Text style={styles.count} children={count} />
                  </View>
                )}
            </View>
          ) : (
            <FastImage
              style={styles.img_icon}
              tintColor={tintColor}
              source={TAB_BAR[route.name].icon}
              resizeMode={'contain'}
            />
          )}
        </>
      )}
    </>
  )
}

const renderTabBarLabel = (_focused: boolean, _route: any) => {
  return <></>
}

const MainTab = (route: any) => {
  const dispatch = useDispatch()
  const routeName = getFocusedRouteNameFromRoute(route)
  reactotron.log!('routeName', routeName)
  return (
    <Tab.Navigator
      tabBarOptions={{
        keyboardHidesTabBar: false,
        tabStyle: {
          flexDirection: 'column',
          borderTopLeftRadius: 28,
          borderTopRightRadius: 28,
        },
      }}
      tabBar={props => (
        <BottomTabBar
          {...props}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            height: isIphoneX() ? getBottomSpace() + 55 : 63,
          }}
        />
      )}
      // eslint-disable-next-line no-shadow
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          return <RenderTabBarIcon focused={focused} route={route} />
        },
        tabBarLabel: ({ focused }) => renderTabBarLabel(focused, route),
        tabBarButton: props => {
          return (
            <TouchableOpacity
              {...props}
              onPress={async e => {
                const token = await AsyncStorage.getItem('token')
                if (TabBarNameRequireLogin.includes(route.name) && !token) {
                  showConfirm(
                    R.strings().notification,
                    R.strings().please_login,
                    () => {
                      dispatch(navigateSwitch(SCREEN_ROUTER.AUTH))
                    }
                  )
                  return
                } else if (route.name === MAIN_TAB.CREATE_POST) {
                  NavigationUtil.navigate(SCREEN_ROUTER_APP.CREATE_POST)
                  //dispatch(navigateSwitch(SCREEN_ROUTER.CREATE_POST))
                  return
                }
                if (props.onPress) props.onPress(e)
              }}
            />
          )
        },
      })}
    >
      {Object.keys(TAB_BAR).map((item, index) => (
        <Tab.Screen
          key={index}
          name={TAB_BAR[item].name}
          component={TAB_BAR[item].route}
        />
        // <>
        //   {index === 2 ? (
        //     <Tab.Screen
        //       options={{ tabBarVisible: false }}
        //       key={index}
        //       name={TAB_BAR[item].name}
        //       component={TAB_BAR[item].route}
        //     />
        //   ) : (
        //     <Tab.Screen
        //       key={index}
        //       name={TAB_BAR[item].name}
        //       component={TAB_BAR[item].route}
        //     />
        //   )}
        // </>
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
const styles = StyleSheet.create({
  img_icon: {
    width: 24,
    height: 24,
  },
  v_qrCode: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 38,
    height: 38,
    borderRadius: 38 / 2,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.4,
    shadowRadius: 2.41,
    elevation: 2,
  },
  image: {
    width: 36,
    height: 36,
  },
  tab_bar_ctn: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    backgroundColor: '#ffffff',
    height: isIphoneX() ? getBottomSpace() + 55 : 63,
    width: dimension.width,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.55,
    shadowRadius: 12.35,
    elevation: 19,
  },
  bottom_tab: {
    height: isIphoneX() ? getBottomSpace() + 55 : 63,
    position: 'absolute',
    backgroundColor: 'transparent',
    borderTopColor: 'transparent',
    borderColor: 'transparent',
    elevation: 0,
  },
  v_dot: {
    width: 19,
    height: 19,
    backgroundColor: 'red',
    borderRadius: 19 / 2,
    position: 'absolute',
    justifyContent: 'center',
    right: -12,
    top: -10,
    alignItems: 'center',
  },
  count: {
    color: 'white',
    ...fonts.regular11,
    fontWeight: '500',
  },
})
