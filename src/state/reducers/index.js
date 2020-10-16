import { combineReducers } from '@reduxjs/toolkit'

import auth from './auth'
import createWorkout from '_features/create-workout/reducers/create-workout'
import exercises from './exercises'
import routines from './routines'
import workouts from './workouts'

const rootReducer = combineReducers({
  auth,
  createWorkout,
  exercises,
  routines,
  workouts,
})

export default rootReducer
