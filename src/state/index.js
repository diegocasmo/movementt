import { configureStore, combineReducers } from '@reduxjs/toolkit'

import { session } from '_state/reducers'

const store = configureStore({
  reducer: combineReducers({ session }),
})

export default store
