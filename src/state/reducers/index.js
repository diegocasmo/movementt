import { combineReducers } from '@reduxjs/toolkit'

import auth from './auth'
import routines from './routines'
import newWorkout from '_features/new-workout/reducers/new-workout'

const rootReducer = combineReducers({ auth, routines, newWorkout })

export default rootReducer
