import { configureStore, combineReducers } from '@reduxjs/toolkit'

import auth from '_state/reducers/auth'
import createWorkout from '_features/create-workout/reducers/create-workout'
import workouts from '_state/reducers/workouts'
import { routineApi } from '_state/services/routine'
import { exerciseApi } from '_state/services/exercise'

const store = configureStore({
  reducer: combineReducers({
    auth,
    createWorkout,
    workouts,
    [routineApi.reducerPath]: routineApi.reducer,
    [exerciseApi.reducerPath]: exerciseApi.reducer,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      routineApi.middleware,
      exerciseApi.middleware
    ),
})

export default store
