import { configureStore, combineReducers } from '@reduxjs/toolkit'

import { auth, session } from '_state/reducers'
import { workoutApi, routineApi, exerciseApi } from '_state/services'

const store = configureStore({
  reducer: combineReducers({
    session,
    auth,
    [exerciseApi.reducerPath]: exerciseApi.reducer,
    [routineApi.reducerPath]: routineApi.reducer,
    [workoutApi.reducerPath]: workoutApi.reducer,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      exerciseApi.middleware,
      routineApi.middleware,
      workoutApi.middleware
    ),
})

export default store
