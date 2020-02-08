import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import GuestWelcomeScreen from '../features/guest-welcome/screens/GuestWelcomeScreen'
import SignInScreen from '../features/sign-in/screens/SignInScreen'
import SignUpScreen from '../features/sign-up/screens/SignUpScreen'
import ForgotPasswordScreen from '../features/forgot-password/screens/ForgotPasswordScreen'

export default createAppContainer(
  createStackNavigator({
    GuestWelcome: GuestWelcomeScreen,
    SignIn: SignInScreen,
    SignUp: SignUpScreen,
    ForgotPassword: ForgotPasswordScreen,
  })
)
