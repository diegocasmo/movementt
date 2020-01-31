import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'

import WorkoutListScreen from '../features/workout-list/screens/WorkoutListScreen'
import SettingsScreen from '../features/settings/screens/SettingsScreen'
import FooterTabs from '../components/FooterTabs'

const VerifiedAppNavigator = createBottomTabNavigator(
  {
    WorkoutList: WorkoutListScreen,
    Settings: SettingsScreen,
  },
  {
    tabBarComponent: props => <FooterTabs {...props} />,
  }
)

export default createAppContainer(VerifiedAppNavigator)
