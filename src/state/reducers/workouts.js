import { createSlice } from '@reduxjs/toolkit'
import { fetch, create } from '../../api/models/workout'
import { REQUEST_STATUS } from '../../utils/request-utils'

const initialState = {
  itemsById: {},
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
      state.itemsById = payload
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
      state.itemsById[payload.key] = payload.attrs
      state.status = REQUEST_STATUS.NONE
    },
    createWorkoutError(state) {
      state.status = REQUEST_STATUS.NONE
    },
  },
})

export const fetchWorkouts = (uid) => async (dispatch) => {
  dispatch(workouts.actions.fetchWorkoutsInit())
  try {
    const payload = await fetch(uid)
    dispatch(workouts.actions.fetchWorkoutsSuccess(payload))
  } catch (err) {
    dispatch(workouts.actions.fetchWorkoutsError())
    throw err
  }
}

export const createWorkout = (uid, attrs) => async (dispatch) => {
  dispatch(workouts.actions.createWorkoutInit())
  try {
    const payload = await create(uid, attrs)
    dispatch(workouts.actions.createWorkoutSuccess(payload))
  } catch (err) {
    dispatch(workouts.actions.createWorkoutError())
    throw err
  }
}

export const isFetching = (state) => {
  return state.workouts.status === REQUEST_STATUS.GET
}

export const isCreating = (state) => {
  return state.workouts.status === REQUEST_STATUS.POST
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
