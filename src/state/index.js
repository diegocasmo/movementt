import { configureStore, combineReducers } from '@reduxjs/toolkit'

import { auth, session } from '_state/reducers'

const store = configureStore({
  reducer: combineReducers({
    session,
    auth,
  }),
})

export default store
