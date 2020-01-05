import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import VerifyEmailScreen from '../features/email-verification/screens/VerifyEmailScreen'

export default createAppContainer(
  createStackNavigator({
    VerifyEmail: VerifyEmailScreen,
  })
)
