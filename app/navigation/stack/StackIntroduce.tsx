import IntroduceScreen1 from '@app/screens/Introduce/IntroduceScreen1'
import React from 'react'
import { SCREEN_ROUTER_INTRODUCE } from '@app/constant/Constant'
import { createStackNavigator } from '@react-navigation/stack'

const { INTRODUCE1 } = SCREEN_ROUTER_INTRODUCE
const Stack = createStackNavigator()

const introduceScreen = {
  [INTRODUCE1]: IntroduceScreen1,
}

export const StackIntroduceScreen = () => {
  return (
    <>
      <Stack.Navigator headerMode="none">
        {Object.keys(introduceScreen).map((item, index) => (
          <Stack.Screen
            key={index}
            name={item}
            component={introduceScreen[item]}
          />
        ))}
      </Stack.Navigator>
    </>
  )
}
