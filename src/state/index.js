import { configureStore, combineReducers } from '@reduxjs/toolkit'

import auth from '_state/reducers/auth'
import createWorkout from '_features/create-workout/reducers/create-workout'
import workouts from '_state/reducers/workouts'
import { routineApi, exerciseApi, userApi } from '_state/services'

const store = configureStore({
  reducer: combineReducers({
    auth,
    createWorkout,
    workouts,
    [exerciseApi.reducerPath]: exerciseApi.reducer,
    [routineApi.reducerPath]: routineApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      exerciseApi.middleware,
      routineApi.middleware,
      userApi.middleware
    ),
})

export default store
