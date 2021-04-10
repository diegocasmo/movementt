import { configureStore, combineReducers } from '@reduxjs/toolkit'

import auth from '_state/reducers/auth'
import createWorkout from '_features/create-workout/reducers/create-workout'
import workouts from '_state/reducers/workouts'
import { routineApi } from '_state/services/routine'

const store = configureStore({
  reducer: combineReducers({
    auth,
    createWorkout,
    workouts,
    [routineApi.reducerPath]: routineApi.reducer,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(routineApi.middleware),
})

export default store
