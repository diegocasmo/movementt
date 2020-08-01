import { combineReducers } from '@reduxjs/toolkit'

import auth from './auth'
import routines from './routines'
import newSession from '_features/new-session/reducers/new-session'

const rootReducer = combineReducers({ auth, routines, newSession })

export default rootReducer
