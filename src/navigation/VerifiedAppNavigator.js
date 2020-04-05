import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

// Workout
import WorkoutListScreen from '../features/workout-list/screens/WorkoutListScreen'

// Session
import NewSessionScreen from '../features/new-session/screens/NewSessionScreen'

// Settings
import SettingsScreen from '../features/settings/screens/SettingsScreen'
import ReauthenticateScreen from '../features/update-password/screens/ReauthenticateScreen'
import UpdatePasswordScreen from '../features/update-password/screens/UpdatePasswordScreen'

import FooterTabs from '../components/FooterTabs'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

const SettingsNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="Reauthenticate"
        component={ReauthenticateScreen}
        options={{ title: 'Sign In' }}
      />
      <Stack.Screen
        name="UpdatePassword"
        component={UpdatePasswordScreen}
        options={{ title: 'Update Password' }}
      />
    </Stack.Navigator>
  )
}

const NewSessionNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="NewSession"
        component={NewSessionScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

const VerifiedAppNavigator = () => {
  return (
    <Tab.Navigator tabBar={(props) => <FooterTabs {...props} />}>
      <Tab.Screen name="WorkoutList" component={WorkoutListScreen} />
      <Tab.Screen
        name="NewSession"
        component={NewSessionNavigator}
        options={{ tabBarVisible: false, gestureEnabled: false }}
      />
      <Tab.Screen name="Settings" component={SettingsNavigator} />
    </Tab.Navigator>
  )
}

export default VerifiedAppNavigator
