import { combineReducers } from '@reduxjs/toolkit'

import auth from './auth'
import createWorkout from '_features/create-workout/reducers/create-workout'
import routines from './routines'
import workouts from './workouts'

const rootReducer = combineReducers({
  auth,
  createWorkout,
  routines,
  workouts,
})

export default rootReducer
