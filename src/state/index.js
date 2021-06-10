import { configureStore, combineReducers } from '@reduxjs/toolkit'

import { auth, createWorkout, workouts } from '_state/reducers'
import { routineApi, exerciseApi } from '_state/services'

const store = configureStore({
  reducer: combineReducers({
    createWorkout,
    workouts,
    auth,
    [exerciseApi.reducerPath]: exerciseApi.reducer,
    [routineApi.reducerPath]: routineApi.reducer,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      exerciseApi.middleware,
      routineApi.middleware
    ),
})

export default store
