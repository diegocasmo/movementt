import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

// Routine
import RoutineListScreen from '_features/routine-list/screens/RoutineListScreen'
import RoutineItemScreen from '_features/routine-item/screens/RoutineItemScreen'
import CreateRoutineScreen from '_features/create-routine/screens/CreateRoutineScreen'
import UpdateRoutineScreen from '_features/update-routine/screens/UpdateRoutineScreen'

// Exercise
import ExerciseListScreen from '_features/exercise-list/screens/ExerciseListScreen'

// Workout
import CreateWorkoutScreen from '_features/create-workout/screens/CreateWorkoutScreen'
import WorkoutListScreen from '_features/workout-list/screens/WorkoutListScreen'

// Settings
import SettingsScreen from '_features/settings/screens/SettingsScreen'
import ReauthenticateScreen from '_features/update-password/screens/ReauthenticateScreen'
import UpdatePasswordScreen from '_features/update-password/screens/UpdatePasswordScreen'

import FooterTabs from '_components/FooterTabs'
import { ExercisesProvider } from '_hooks/use-exercises'

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
        component={RoutineListScreen}
        options={{ title: 'Home', headerShown: false }}
      />
      <HomeStack.Screen
        name="RoutineItem"
        component={RoutineItemScreen}
        options={{ title: 'Routine Details' }}
      />
    </HomeStack.Navigator>
  )
}

const ExerciseStack = createStackNavigator()
const ExerciseNavigator = () => {
  return (
    <ExerciseStack.Navigator>
      <ExerciseStack.Screen
        name="ExerciseList"
        component={ExerciseListScreen}
        options={{ title: 'Exercise', headerShown: false }}
      />
    </ExerciseStack.Navigator>
  )
}

const WorkoutStack = createStackNavigator()
const WorkoutNavigator = () => {
  return (
    <WorkoutStack.Navigator>
      <WorkoutStack.Screen
        name="WorkoutList"
        component={WorkoutListScreen}
        options={{ title: 'Workout', headerShown: false }}
      />
    </WorkoutStack.Navigator>
  )
}

const HomeTabs = createBottomTabNavigator()
const HomeTabsNavigator = () => {
  return (
    <HomeTabs.Navigator tabBar={(props) => <FooterTabs {...props} />}>
      <HomeTabs.Screen name="Home" component={HomeNavigator} />
      <HomeTabs.Screen name="ExerciseList" component={ExerciseNavigator} />
      <HomeTabs.Screen name="WorkoutList" component={WorkoutNavigator} />
      <HomeTabs.Screen name="Settings" component={SettingsNavigator} />
    </HomeTabs.Navigator>
  )
}

const AppStack = createStackNavigator()
const VerifiedAppNavigator = () => {
  return (
    <ExercisesProvider>
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
          name="CreateRoutine"
          component={CreateRoutineScreen}
          options={{ title: 'Create Routine', gestureEnabled: false }}
        />
        <AppStack.Screen
          name="UpdateRoutine"
          component={UpdateRoutineScreen}
          options={{ title: 'Update Routine', gestureEnabled: false }}
        />
        <AppStack.Screen
          name="CreateWorkout"
          component={CreateWorkoutScreen}
          options={{ headerShown: false, gestureEnabled: false }}
        />
      </AppStack.Navigator>
    </ExercisesProvider>
  )
}

export default VerifiedAppNavigator
