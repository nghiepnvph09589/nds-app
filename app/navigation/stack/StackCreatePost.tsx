import { SCREEN_ROUTER_CREATE_POST } from '@app/constant/Constant'
import CreatePost from '@app/screens/CreatePost'
import AddressMap from '@app/screens/CreatePost/screens/AddressMap'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

const { ADDRESS_MAP, CREATE_POST } = SCREEN_ROUTER_CREATE_POST
const Stack = createStackNavigator()

const creatPostScreen = {
  [CREATE_POST]: CreatePost,
  [ADDRESS_MAP]: AddressMap,
}

export const StackCreatPostScreen = () => {
  return (
    <>
      <Stack.Navigator headerMode="none">
        {Object.keys(creatPostScreen).map((item, index) => (
          <Stack.Screen
            key={index}
            name={item}
            component={creatPostScreen[item]}
          />
        ))}
      </Stack.Navigator>
    </>
  )
}
