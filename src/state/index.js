import { configureStore, combineReducers } from '@reduxjs/toolkit'

import { auth, session } from '_state/reducers'
import { workoutApi } from '_state/services'

const store = configureStore({
  reducer: combineReducers({
    session,
    auth,
    [workoutApi.reducerPath]: workoutApi.reducer,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(workoutApi.middleware),
})

export default store
