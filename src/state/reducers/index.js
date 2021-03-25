import { combineReducers } from '@reduxjs/toolkit'

import auth from './auth'
import createWorkout from '_features/create-workout/reducers/create-workout'
import workouts from './workouts'

const rootReducer = combineReducers({
  auth,
  createWorkout,
  workouts,
})

export default rootReducer
