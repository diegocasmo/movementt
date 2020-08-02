import { combineReducers } from '@reduxjs/toolkit'

import auth from './auth'
import routines from './routines'
import exercises from './exercises'
import createWorkout from '_features/create-workout/reducers/create-workout'

const rootReducer = combineReducers({
  auth,
  routines,
  exercises,
  createWorkout,
})

export default rootReducer
