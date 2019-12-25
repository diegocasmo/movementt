import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { Icon } from 'native-base'

import WorkoutListScreen from '../features/workout-list/screens/WorkoutListScreen'
import SettingsScreen from '../features/settings/screens/SettingsScreen'
import FooterTabs from '../components/FooterTabs'

const AuthenticatedAppNavigator = createBottomTabNavigator(
  {
    WorkoutList: WorkoutListScreen,
    Settings: SettingsScreen,
  },
  {
    tabBarComponent: props => <FooterTabs {...props} />,
  }
)

export default createAppContainer(AuthenticatedAppNavigator)
