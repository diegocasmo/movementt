import { createSwitchNavigator, createAppContainer } from 'react-navigation'

import AuthLoadingScreen from '../screens/AuthLoadingScreen'
import GuestAppNavigator from './GuestAppNavigator'
import AuthenticatedAppNavigator from './AuthenticatedAppNavigator'

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoadingScreen: AuthLoadingScreen,
      GuestApp: GuestAppNavigator,
      AuthenticatedApp: AuthenticatedAppNavigator,
    },
    {
      initialRouteName: 'AuthLoadingScreen',
    }
  )
)
