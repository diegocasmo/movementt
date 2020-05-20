import { createSlice } from '@reduxjs/toolkit'
import Workout from '../../api/models/Workout'
import { REQUEST_STATUS } from '../../utils/request-utils'

const initialState = {
  itemsById: {},
  statusByItemId: {},
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
      Object.entries(payload).map(([key, attrs]) => {
        state.itemsById[key] = attrs
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
      state.itemsById[payload.key] = payload.values
      state.status = REQUEST_STATUS.NONE
    },
    createWorkoutError(state) {
      state.status = REQUEST_STATUS.NONE
    },

    // Delete workout
    deleteWorkoutInit(state, { payload }) {
      state.statusByItemId[payload] = REQUEST_STATUS.DELETE
    },
    deleteWorkoutSuccess(state, { payload }) {
      delete state.itemsById[payload]
      delete state.statusByItemId[payload]
    },
    deleteWorkoutError(state, { payload }) {
      state.statusByItemId[payload] = REQUEST_STATUS.NONE
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

export const createWorkout = (uid, attrs) => async (dispatch) => {
  dispatch(workouts.actions.createWorkoutInit())
  try {
    const payload = await Workout.create(uid, attrs)
    dispatch(workouts.actions.createWorkoutSuccess(payload))
  } catch (err) {
    dispatch(workouts.actions.createWorkoutError())
    throw err
  }
}

export const deleteWorkout = (uid, key) => async (dispatch) => {
  dispatch(workouts.actions.deleteWorkoutInit(key))
  try {
    const payload = await Workout.destroy(uid, key)
    dispatch(workouts.actions.deleteWorkoutSuccess(payload))
  } catch (err) {
    dispatch(workouts.actions.deleteWorkoutError(key))
    throw err
  }
}

export const isFetching = (state) => {
  return state.workouts.status === REQUEST_STATUS.GET
}

export const isCreating = (state) => {
  return state.workouts.status === REQUEST_STATUS.POST
}

export const isDeleting = (state, key) => {
  return state.workouts.statusByItemId[key] === REQUEST_STATUS.DELETE
}

export const getWorkouts = (state) => {
  return Object.entries(state.workouts.itemsById).map(([key, attrs]) => {
    return {
      key,
      ...attrs,
    }
  })
}

export default workouts.reducer
