import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

// Workout
import WorkoutListScreen from '../features/workout-list/screens/WorkoutListScreen'
import WorkoutFormScreen from '../features/workout-form/screens/WorkoutFormScreen'

// Session
import NewSessionScreen from '../features/new-session/screens/NewSessionScreen'

// Settings
import SettingsScreen from '../features/settings/screens/SettingsScreen'
import ReauthenticateScreen from '../features/update-password/screens/ReauthenticateScreen'
import UpdatePasswordScreen from '../features/update-password/screens/UpdatePasswordScreen'

import FooterTabs from '../components/FooterTabs'

const SettingsStack = createStackNavigator()
const SettingsNavigator = () => {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <SettingsStack.Screen
        name="Reauthenticate"
        component={ReauthenticateScreen}
        options={{ title: 'Sign In' }}
      />
      <SettingsStack.Screen
        name="UpdatePassword"
        component={UpdatePasswordScreen}
        options={{ title: 'Update Password' }}
      />
    </SettingsStack.Navigator>
  )
}

const HomeTabs = createBottomTabNavigator()
const HomeTabsNavigator = () => {
  return (
    <HomeTabs.Navigator tabBar={(props) => <FooterTabs {...props} />}>
      <HomeTabs.Screen name="Home" component={WorkoutListScreen} />
      <HomeTabs.Screen name="WorkoutForm" component={WorkoutFormScreen} />
      <HomeTabs.Screen name="Settings" component={SettingsNavigator} />
    </HomeTabs.Navigator>
  )
}

const AppStack = createStackNavigator()
const VerifiedAppNavigator = () => {
  return (
    <AppStack.Navigator tabBar={(props) => <FooterTabs {...props} />}>
      <AppStack.Screen
        name="Home"
        component={HomeTabsNavigator}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="WorkoutForm"
        component={HomeTabsNavigator}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="Settings"
        component={HomeTabsNavigator}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="NewSession"
        component={NewSessionScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
    </AppStack.Navigator>
  )
}

export default VerifiedAppNavigator
