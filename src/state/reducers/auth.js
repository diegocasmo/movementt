import { createAsyncThunk, createSlice, createSelector } from '@reduxjs/toolkit'
import { User } from '_api'
import { REQUEST_STATUS } from '_utils/request-utils'
import { resetWorkouts } from '_state/reducers/workouts'
import { resetSession } from '_state/reducers/session'
import { routineApi, exerciseApi } from '_state/services'

export const signUp = createAsyncThunk(
  'auth/signUp',
  async ({ email = '', password = '' }) => {
    // FB automatically signs user in when their account is created
    await User.createUserWithEmailAndPassword(email, password)
    User.sendEmailVerification()

    return null
  }
)

export const signIn = createAsyncThunk(
  'auth/signIn',
  async ({ email = '', password = '', apiOnly = false }) => {
    if (!apiOnly) {
      await User.signInWithEmailAndPassword(email, password)
    }

    const data = await User.me()
    return data
  }
)

export const signOut = createAsyncThunk('auth/signOut', async (_, thunkAPI) => {
  const { dispatch } = thunkAPI

  // Sign user out and reset all user-related state data
  await User.signOut()
  dispatch(resetSession())
  dispatch(resetWorkouts())
  dispatch(exerciseApi.util.resetApiState())
  dispatch(routineApi.util.resetApiState())

  return null
})

export const confirmVerification = createAsyncThunk(
  'auth/confirmVerification',
  async () => {
    const data = await User.verify()

    return data
  }
)

export const sendVerification = createAsyncThunk(
  'auth/sendVerification',
  async () => {
    await User.sendEmailVerification()

    return null
  }
)

export const updatePassword = createAsyncThunk(
  'auth/updatePassword',
  async (password) => {
    await User.updatePassword(password)

    return null
  }
)

const initialState = {
  // Status of auth listener
  status: REQUEST_STATUS.GET,

  // Current user state
  data: {
    user: null,
    status: REQUEST_STATUS.IDLE,
  },
}

export const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authStateChanged: (state) => {
      state.status = REQUEST_STATUS.IDLE
    },
  },
  extraReducers: {
    // Sign Up
    [signUp.pending]: (state) => {
      state.data.status = REQUEST_STATUS.GET
    },
    [signUp.fulfilled]: (state) => {
      state.data.status = REQUEST_STATUS.IDLE
    },
    [signUp.rejected]: (state) => {
      state.data.status = REQUEST_STATUS.IDLE
    },

    // Sign In
    [signIn.pending]: (state) => {
      state.data.status = REQUEST_STATUS.GET
    },
    [signIn.fulfilled]: (state, { payload }) => {
      state.data.user = payload
      state.data.status = REQUEST_STATUS.IDLE
    },
    [signIn.rejected]: (state) => {
      state.data.status = REQUEST_STATUS.IDLE
    },

    // Sign Out
    [signOut.pending]: (state) => {
      state.data.status = REQUEST_STATUS.DELETE
    },
    [signOut.fulfilled]: (state) => {
      state.data.user = null
      state.data.status = REQUEST_STATUS.IDLE
    },
    [signOut.rejected]: (state) => {
      state.data.status = REQUEST_STATUS.IDLE
    },

    // Confirm Verification
    [confirmVerification.pending]: (state) => {
      state.data.status = REQUEST_STATUS.PUT
    },
    [confirmVerification.fulfilled]: (state, { payload }) => {
      state.data.user = payload
      state.data.status = REQUEST_STATUS.IDLE
    },
    [confirmVerification.rejected]: (state) => {
      state.data.status = REQUEST_STATUS.IDLE
    },
  },
})

export const authStateChanged = () => (dispatch) => {
  dispatch(slice.actions.authStateChanged())
}

export default slice.reducer

export const isLoadingAuth = createSelector(
  (state) => state.auth.status,
  (status) => status !== REQUEST_STATUS.IDLE
)

export const isLoadingUser = createSelector(
  (state) => state.auth.data,
  (data) => data.status !== REQUEST_STATUS.IDLE
)

export const getUser = createSelector(
  (state) => state.auth.data,
  (data) => data.user
)
