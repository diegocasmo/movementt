import { combineReducers } from '@reduxjs/toolkit'

import auth from './auth'
import workouts from '../../features/workout-list/reducers/workouts'
import newSession from '../../features/new-session/reducers/new-session'

const rootReducer = combineReducers({ auth, workouts, newSession })

export default rootReducer
