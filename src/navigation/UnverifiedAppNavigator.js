import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import VerifyEmailScreen from '_features/email-verification/screens/VerifyEmailScreen'

const Stack = createStackNavigator()

const UnverifiedAppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="VerifyEmail"
        component={VerifyEmailScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
    </Stack.Navigator>
  )
}

export default UnverifiedAppNavigator
