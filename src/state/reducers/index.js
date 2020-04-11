import { combineReducers } from '@reduxjs/toolkit'

import auth from './auth'
import newSession from '../../features/new-session/reducers'

const rootReducer = combineReducers({ auth, newSession })

export default rootReducer
