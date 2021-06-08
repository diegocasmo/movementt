import { configureStore, combineReducers } from '@reduxjs/toolkit'

import createWorkout from '_features/create-workout/reducers/create-workout'
import workouts from '_state/reducers/workouts'
import { routineApi, exerciseApi } from '_state/services'

const store = configureStore({
  reducer: combineReducers({
    createWorkout,
    workouts,
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
