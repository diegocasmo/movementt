import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit'
import { createWorkout as create, fetchWorkouts as fetch } from '_api/workout'
import { REQUEST_STATUS } from '_utils/request-utils'

const workoutsAdapter = createEntityAdapter({
  selectId: (workout) => workout.key,
})

export const fetchWorkouts = createAsyncThunk(
  'workouts/fetchWorkouts',
  async (uid, thunkAPI) => {
    const { cursorKey, pageSize } = thunkAPI.getState().workouts
    const workouts = await fetch(uid, cursorKey, pageSize)
    return { workouts }
  }
)

export const createWorkout = createAsyncThunk(
  'workouts/createWorkout',
  async (attrs) => {
    const workout = await create(attrs.uid, attrs)
    return workout
  }
)

const initialState = workoutsAdapter.getInitialState({
  cursorKey: null,
  hasMore: true,
  pageSize: 12,
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
      state.cursorKey = initialState.cursorKey
      state.hasMore = initialState.hasMore
      state.pageSize = initialState.pageSize
      state.statusById = initialState.statusById
      state.status = initialState.status
    },
  },
  extraReducers: {
    [fetchWorkouts.pending]: (state) => {
      state.status = REQUEST_STATUS.GET
    },
    [fetchWorkouts.fulfilled]: (state, action) => {
      const { workouts } = action.payload
      state.status = REQUEST_STATUS.NONE
      state.cursorKey =
        workouts && workouts.length >= 0 ? workouts[0].key : null
      state.hasMore = workouts.length >= state.pageSize
      workoutsAdapter.upsertMany(state, workouts)
    },
    [fetchWorkouts.rejected]: (state) => {
      state.status = REQUEST_STATUS.NONE
    },

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

const workoutsSelector = workoutsAdapter.getSelectors((state) => state.workouts)

export const isFetching = createSelector(
  (state) => state.workouts.status,
  (status) => status === REQUEST_STATUS.GET
)

export const isCreating = createSelector(
  (state) => state.workouts.status,
  (status) => status === REQUEST_STATUS.POST
)

export const hasMore = createSelector(
  (state) => state.workouts.hasMore,
  (hasMore) => hasMore
)

export const getWorkouts = createSelector(
  workoutsSelector.selectAll,
  (workouts) => {
    // Sort workouts by most recently completed first
    return [...workouts].sort((a, b) => {
      return b.completedAt - a.completedAt
    })
  }
)
