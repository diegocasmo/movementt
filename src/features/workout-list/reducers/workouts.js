import { createSlice } from '@reduxjs/toolkit'
import { fetch } from '../../../api/models/workout'
import { REQUEST_STATUS } from '../../../utils/request-utils'

const initialState = {
  itemsById: {},
  status: REQUEST_STATUS.NONE,
}

const workouts = createSlice({
  name: 'workouts',
  initialState,
  reducers: {
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

export const isFetching = (state) => {
  return state.workouts.status === REQUEST_STATUS.GET
}

export const getWorkouts = (state) => {
  return Object.entries(state.workouts.itemsById).map(([id, attrs]) => {
    return {
      id,
      ...attrs,
    }
  })
}

export default workouts.reducer
