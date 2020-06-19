import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

// Workout
import WorkoutListScreen from '_features/workout-list/screens/WorkoutListScreen'
import WorkoutItemScreen from '_features/workout-item/screens/WorkoutItemScreen'
import CreateWorkoutScreen from '_features/create-workout/screens/CreateWorkoutScreen'
import UpdateWorkoutScreen from '_features/update-workout/screens/UpdateWorkoutScreen'

// Session
import NewSessionScreen from '_features/new-session/screens/NewSessionScreen'

// Settings
import SettingsScreen from '_features/settings/screens/SettingsScreen'
import ReauthenticateScreen from '_features/update-password/screens/ReauthenticateScreen'
import UpdatePasswordScreen from '_features/update-password/screens/UpdatePasswordScreen'

import FooterTabs from '_components/FooterTabs'

const SettingsStack = createStackNavigator()
const SettingsNavigator = () => {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: 'Settings', headerShown: false }}
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

const HomeStack = createStackNavigator()
const HomeNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={WorkoutListScreen}
        options={{ title: 'Home', headerShown: false }}
      />
      <HomeStack.Screen
        name="WorkoutItem"
        component={WorkoutItemScreen}
        options={{ title: 'Workout Details' }}
      />
    </HomeStack.Navigator>
  )
}

const WorkoutForm = () => null
const HomeTabs = createBottomTabNavigator()
const HomeTabsNavigator = () => {
  return (
    <HomeTabs.Navigator tabBar={(props) => <FooterTabs {...props} />}>
      <HomeTabs.Screen name="Home" component={HomeNavigator} />
      <HomeTabs.Screen name="WorkoutForm" component={WorkoutForm} />
      <HomeTabs.Screen name="Settings" component={SettingsNavigator} />
    </HomeTabs.Navigator>
  )
}

const AppStack = createStackNavigator()
const VerifiedAppNavigator = () => {
  return (
    <AppStack.Navigator
      mode="modal"
      tabBar={(props) => <FooterTabs {...props} />}
    >
      <AppStack.Screen
        name="Home"
        component={HomeTabsNavigator}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="CreateWorkout"
        component={CreateWorkoutScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <AppStack.Screen
        name="UpdateWorkout"
        component={UpdateWorkoutScreen}
        options={{ headerShown: false, gestureEnabled: false }}
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
