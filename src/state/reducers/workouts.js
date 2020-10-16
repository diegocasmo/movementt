import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit'
import { createWorkout as create } from '_api/workout'
import { REQUEST_STATUS } from '_utils/request-utils'

const workoutsAdapter = createEntityAdapter({
  selectId: (workout) => workout.key,
})

export const createWorkout = createAsyncThunk(
  'workouts/createWorkout',
  async (attrs) => {
    const workout = await create(attrs.uid, attrs)
    return workout
  }
)

const initialState = workoutsAdapter.getInitialState({
  status: REQUEST_STATUS.NONE,
  statusById: {},
})

export const slice = createSlice({
  name: 'workouts',
  initialState,
  reducers: {
    reset: (state) => {
      state.ids = initialState.ids
      state.entities = initialState.entities
      state.statusById = initialState.statusById
      state.status = initialState.status
    },
  },
  extraReducers: {
    [createWorkout.pending]: (state) => {
      state.status = REQUEST_STATUS.POST
    },
    [createWorkout.fulfilled]: (state, action) => {
      state.status = REQUEST_STATUS.NONE
      workoutsAdapter.addOne(state, action.payload)
    },
    [createWorkout.rejected]: (state) => {
      state.status = REQUEST_STATUS.NONE
    },
  },
})

export default slice.reducer

export const resetWorkouts = () => (dispatch) => {
  dispatch(slice.actions.reset())
}

export const isCreating = createSelector(
  (state) => state.workouts.status,
  (status) => status === REQUEST_STATUS.POST
)
