import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'

import WorkoutListScreen from '../features/workout-list/screens/WorkoutListScreen'
import SettingsScreen from '../features/settings/screens/SettingsScreen'
import ReauthenticateScreen from '../features/update-password/screens/ReauthenticateScreen'
import UpdatePasswordScreen from '../features/update-password/screens/UpdatePasswordScreen'
import FooterTabs from '../components/FooterTabs'

const SettingsNavigator = createStackNavigator({
  Settings: SettingsScreen,
  Reauthenticate: ReauthenticateScreen,
  UpdatePassword: UpdatePasswordScreen,
})

const VerifiedAppNavigator = createBottomTabNavigator(
  {
    WorkoutList: WorkoutListScreen,
    Settings: SettingsNavigator,
  },
  {
    tabBarComponent: props => <FooterTabs {...props} />,
  }
)

export default createAppContainer(VerifiedAppNavigator)
