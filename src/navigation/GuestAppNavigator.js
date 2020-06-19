import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import GuestWelcomeScreen from '_features/guest-welcome/screens/GuestWelcomeScreen'
import SignInScreen from '_features/sign-in/screens/SignInScreen'
import SignUpScreen from '_features/sign-up/screens/SignUpScreen'
import ForgotPasswordScreen from '_features/forgot-password/screens/ForgotPasswordScreen'

const Stack = createStackNavigator()

const GuestAppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="GuestWelcome"
        component={GuestWelcomeScreen}
        options={{
          title: 'Welcome',
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ title: 'Sign In' }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ title: 'Create Account' }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{ title: 'Forgot Password' }}
      />
    </Stack.Navigator>
  )
}

export default GuestAppNavigator
