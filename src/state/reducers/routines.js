import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit'
import * as seed from '_seed/routines.json'
import Routine from '_api/models/Routine'
import { REQUEST_STATUS } from '_utils/request-utils'

const routinesAdapter = createEntityAdapter({
  selectId: (mst) => mst.key,
})

export const fetchRoutines = createAsyncThunk(
  'routines/fetchRoutines',
  async (uid) => {
    const routines = await Routine.fetch(uid)
    return { routines }
  }
)

export const createRoutine = createAsyncThunk(
  'routines/createRoutine',
  async (attrs) => {
    const routine = await Routine.create(attrs.uid, attrs)
    return routine
  }
)

export const updateRoutine = createAsyncThunk(
  'routines/updateRoutine',
  async (attrs) => {
    const routine = await Routine.update(attrs.uid, attrs)
    return routine
  }
)

export const destroyRoutine = createAsyncThunk(
  'routines/destroyRoutine',
  async (attrs) => {
    const routine = await Routine.destroy(attrs.uid, attrs)
    return routine
  }
)

const initialState = routinesAdapter.getInitialState({
  status: REQUEST_STATUS.NONE,
  statusById: {},
})

export const slice = createSlice({
  name: 'routines',
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
    [fetchRoutines.pending]: (state) => {
      state.status = REQUEST_STATUS.GET
    },
    [fetchRoutines.fulfilled]: (state, action) => {
      state.status = REQUEST_STATUS.NONE
      routinesAdapter.upsertMany(state, action.payload.routines)
    },
    [fetchRoutines.rejected]: (state) => {
      state.status = REQUEST_STATUS.NONE
    },

    [createRoutine.pending]: (state) => {
      state.status = REQUEST_STATUS.POST
    },
    [createRoutine.fulfilled]: (state, action) => {
      state.status = REQUEST_STATUS.NONE
      routinesAdapter.addOne(state, action.payload)
    },
    [createRoutine.rejected]: (state) => {
      state.status = REQUEST_STATUS.NONE
    },

    [updateRoutine.pending]: (state, action) => {
      state.statusById[action.meta.arg.key] = REQUEST_STATUS.PUT
    },
    [updateRoutine.fulfilled]: (state, action) => {
      state.statusById[action.payload.key] = REQUEST_STATUS.NONE
      routinesAdapter.upsertOne(state, action.payload)
    },
    [updateRoutine.rejected]: (state, action) => {
      state.statusById[action.meta.arg.key] = REQUEST_STATUS.NONE
    },

    [destroyRoutine.pending]: (state, action) => {
      state.statusById[action.meta.arg.key] = REQUEST_STATUS.DELETE
    },
    [destroyRoutine.fulfilled]: (state, action) => {
      state.statusById[action.payload.key] = REQUEST_STATUS.NONE
      routinesAdapter.removeOne(state, action.payload.key)
    },
    [destroyRoutine.rejected]: (state, action) => {
      state.statusById[action.meta.arg.key] = REQUEST_STATUS.NONE
    },
  },
})

export default slice.reducer

export const resetRoutines = () => (dispatch) => {
  dispatch(slice.actions.reset())
}

const routinesSelector = routinesAdapter.getSelectors((state) => state.routines)

export const isFetching = createSelector(
  (state) => state.routines.status,
  (status) => status === REQUEST_STATUS.GET
)

export const isCreating = createSelector(
  (state) => state.routines.status,
  (status) => status === REQUEST_STATUS.POST
)

export const isUpdating = createSelector(
  (state) => state.routines.statusById,
  (_, id) => id,
  (statusById, id) => statusById[id] === REQUEST_STATUS.PUT
)

export const isDestroying = createSelector(
  (state) => state.routines.statusById,
  (_, id) => id,
  (statusById, id) => statusById[id] === REQUEST_STATUS.DELETE
)

export const getRoutine = createSelector(
  routinesSelector.selectById,
  (_, id) => id,
  (routine, id) => {
    // Fall-back to seed if routine cannot be found in state
    return routine || seed.routines.find((w) => w.key === id)
  }
)

export const getRoutines = createSelector(
  routinesSelector.selectAll,
  (routines) => routines
)
