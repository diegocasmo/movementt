import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import GuestWelcomeScreen from '../features/auth/screens/GuestWelcomeScreen'
import SignInScreen from '../features/auth/screens/SignInScreen'
import SignUpScreen from '../features/auth/screens/SignUpScreen'
import ForgotPasswordScreen from '../features/forgot-password/screens/ForgotPasswordScreen'

export default createAppContainer(
  createStackNavigator({
    GuestWelcome: GuestWelcomeScreen,
    SignIn: SignInScreen,
    SignUp: SignUpScreen,
    ForgotPassword: ForgotPasswordScreen,
  })
)
