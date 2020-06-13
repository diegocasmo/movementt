import { createSlice } from '@reduxjs/toolkit'
import Workout from '../../api/models/Workout'
import { REQUEST_STATUS } from '../../utils/request-utils'

const initialState = {
  byKey: {},
  statusByKey: {},
  status: REQUEST_STATUS.NONE,
}

const workouts = createSlice({
  name: 'workouts',
  initialState,
  reducers: {
    // Fetch workouts
    fetchWorkoutsInit(state) {
      state.status = REQUEST_STATUS.GET
    },
    fetchWorkoutsSuccess(state, { payload }) {
      Object.entries(payload).map(([key, workout]) => {
        state.byKey[key] = { key, ...workout }
      })
      state.status = REQUEST_STATUS.NONE
    },
    fetchWorkoutsError(state) {
      state.status = REQUEST_STATUS.NONE
    },

    // Create workout
    createWorkoutInit(state) {
      state.status = REQUEST_STATUS.POST
    },
    createWorkoutSuccess(state, { payload }) {
      state.byKey[payload.key] = payload
      state.status = REQUEST_STATUS.NONE
    },
    createWorkoutError(state) {
      state.status = REQUEST_STATUS.NONE
    },

    // Update workout
    updateWorkoutInit(state, { payload }) {
      state.statusByKey[payload.key] = REQUEST_STATUS.PUT
    },
    updateWorkoutSuccess(state, { payload }) {
      state.byKey[payload.key] = payload
      state.statusByKey[payload.key] = REQUEST_STATUS.NONE
    },
    updateWorkoutError(state, { payload }) {
      state.statusByKey[payload.key] = REQUEST_STATUS.NONE
    },

    // Destroy workout
    destroyWorkoutInit(state, { payload }) {
      state.statusByKey[payload.key] = REQUEST_STATUS.DELETE
    },
    destroyWorkoutSuccess(state, { payload }) {
      delete state.byKey[payload.key]
      delete state.statusByKey[payload.key]
    },
    destroyWorkoutError(state, { payload }) {
      state.statusByKey[payload.key] = REQUEST_STATUS.NONE
    },
  },
})

export const fetchWorkouts = (uid) => async (dispatch) => {
  dispatch(workouts.actions.fetchWorkoutsInit())
  try {
    const payload = await Workout.fetch(uid)
    dispatch(workouts.actions.fetchWorkoutsSuccess(payload))
  } catch (err) {
    dispatch(workouts.actions.fetchWorkoutsError())
    throw err
  }
}

export const createWorkout = (uid, workout) => async (dispatch) => {
  dispatch(workouts.actions.createWorkoutInit())
  try {
    const payload = await Workout.create(uid, workout)
    dispatch(workouts.actions.createWorkoutSuccess(payload))
    return payload
  } catch (err) {
    dispatch(workouts.actions.createWorkoutError())
    throw err
  }
}

export const updateWorkout = (uid, workout) => async (dispatch) => {
  dispatch(workouts.actions.updateWorkoutInit(workout))
  try {
    const payload = await Workout.update(uid, workout)
    dispatch(workouts.actions.updateWorkoutSuccess(payload))
  } catch (err) {
    dispatch(workouts.actions.updateWorkoutError(workout))
    throw err
  }
}

export const destroyWorkout = (uid, workout) => async (dispatch) => {
  dispatch(workouts.actions.destroyWorkoutInit(workout))
  try {
    const payload = await Workout.destroy(uid, workout)
    dispatch(workouts.actions.destroyWorkoutSuccess(payload))
  } catch (err) {
    dispatch(workouts.actions.destroyWorkoutError(workout))
    throw err
  }
}

export const getWorkout = (state, key) => {
  return state.workouts.byKey[key]
}

export const isFetching = (state) => {
  return state.workouts.status === REQUEST_STATUS.GET
}

export const isCreating = (state) => {
  return state.workouts.status === REQUEST_STATUS.POST
}

export const isUpdating = (state, key) => {
  return state.workouts.statusByKey[key] === REQUEST_STATUS.PUT
}

export const isDeleting = (state, key) => {
  return state.workouts.statusByKey[key] === REQUEST_STATUS.DELETE
}

export const getWorkouts = (state) => {
  return Object.entries(state.workouts.byKey).map(([key, workout]) => {
    return {
      key,
      ...workout,
    }
  })
}

export default workouts.reducer
