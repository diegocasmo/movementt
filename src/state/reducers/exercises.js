import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit'
import { Exercise } from '_api'
import { REQUEST_STATUS } from '_utils/request-utils'

const exercisesAdapter = createEntityAdapter({
  selectId: (exercise) => exercise.id,
})

export const fetchExercises = createAsyncThunk(
  'exercises/fetchExercises',
  async () => {
    const exercises = await Exercise.fetch()

    return { exercises }
  }
)

export const createExercise = createAsyncThunk(
  'exercises/createExercise',
  async (attrs) => {
    const exercise = await Exercise.create(attrs)
    return exercise
  }
)

export const updateExercise = createAsyncThunk(
  'exercises/updateExercise',
  async (attrs) => {
    const exercise = await Exercise.update(attrs)
    return exercise
  }
)

export const destroyExercise = createAsyncThunk(
  'exercises/destroyExercise',
  async (exercise) => {
    await Exercise.destroy(exercise)

    return exercise
  }
)

const initialState = exercisesAdapter.getInitialState({
  status: REQUEST_STATUS.NONE,
  statusById: {},
})

export const slice = createSlice({
  name: 'exercises',
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
    [fetchExercises.pending]: (state) => {
      state.status = REQUEST_STATUS.GET
    },
    [fetchExercises.fulfilled]: (state, action) => {
      state.status = REQUEST_STATUS.NONE
      exercisesAdapter.upsertMany(state, action.payload.exercises)
    },
    [fetchExercises.rejected]: (state) => {
      state.status = REQUEST_STATUS.NONE
    },

    [createExercise.pending]: (state) => {
      state.status = REQUEST_STATUS.POST
    },
    [createExercise.fulfilled]: (state, action) => {
      state.status = REQUEST_STATUS.NONE
      exercisesAdapter.addOne(state, action.payload)
    },
    [createExercise.rejected]: (state) => {
      state.status = REQUEST_STATUS.NONE
    },

    [updateExercise.pending]: (state, action) => {
      state.statusById[action.meta.arg.id] = REQUEST_STATUS.PUT
    },
    [updateExercise.fulfilled]: (state, action) => {
      state.statusById[action.meta.arg.id] = REQUEST_STATUS.NONE
      exercisesAdapter.upsertOne(state, action.payload)
    },
    [updateExercise.rejected]: (state, action) => {
      state.statusById[action.meta.arg.id] = REQUEST_STATUS.NONE
    },

    [destroyExercise.pending]: (state, action) => {
      state.statusById[action.meta.arg.id] = REQUEST_STATUS.DELETE
    },
    [destroyExercise.fulfilled]: (state, action) => {
      state.statusById[action.payload.id] = REQUEST_STATUS.NONE
      exercisesAdapter.removeOne(state, action.payload.id)
    },
    [destroyExercise.rejected]: (state, action) => {
      state.statusById[action.payload.id] = REQUEST_STATUS.NONE
    },
  },
})

export default slice.reducer

export const resetExercises = () => (dispatch) => {
  dispatch(slice.actions.reset())
}

const exercisesSelector = exercisesAdapter.getSelectors(
  (state) => state.exercises
)

export const isFetching = createSelector(
  (state) => state.exercises.status,
  (status) => status === REQUEST_STATUS.GET
)

export const isCreating = createSelector(
  (state) => state.exercises.status,
  (status) => status === REQUEST_STATUS.POST
)

export const isUpdating = createSelector(
  (state) => state.exercises.statusById,
  (_, id) => id,
  (statusById, id) => statusById[id] === REQUEST_STATUS.PUT
)

export const isDestroying = createSelector(
  (state) => state.exercises.statusById,
  (_, id) => id,
  (statusById, id) => statusById[id] === REQUEST_STATUS.DELETE
)

export const getExercise = createSelector(exercisesSelector.selectById)

export const getExercises = createSelector(
  exercisesSelector.selectAll,
  (exercises) => {
    // Sort exercises by ascending case insensitive name
    return [...exercises].sort((a, b) => {
      return a.name.toLowerCase().localeCompare(b.name.toLowerCase())
    })
  }
)
