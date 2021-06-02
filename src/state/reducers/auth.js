import { createSlice } from '@reduxjs/toolkit'
import { User } from '_api'
import { resetWorkouts } from '_state/reducers/workouts'
import { resetWorkout } from '_features/create-workout/reducers/create-workout'

const initialState = {
  user: null,
  isLoadingAuth: true,
  isLoadingUser: false,
}

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authStateChangedPending(state) {
      state.isLoadingUser = true
    },
    authStateChangedFulfilled(state, { payload }) {
      state.user = payload
      state.isLoadingAuth = false
      state.isLoadingUser = false
    },
    authStateChangedRejected(state) {
      state.isLoadingAuth = false
      state.isLoadingUser = false
      state.user = null
    },

    // Reload current user
    verifyUserPending(state) {
      state.isLoadingUser = true
    },
    verifyUserFulfilled(state, { payload }) {
      state.user = payload
      state.isLoadingUser = false
    },
    verifyUserRejected(state) {
      state.isLoadingUser = false
    },
  },
})

export default auth.reducer

export const handleAuthStateChanged = (authenticated) => async (dispatch) => {
  dispatch(auth.actions.authStateChangedPending())

  const unauthenticate = () => {
    User.signOut()
    dispatch(resetWorkouts())
    dispatch(resetWorkout())
    dispatch(auth.actions.authStateChangedRejected())
  }

  if (!authenticated) {
    return unauthenticate()
  }

  try {
    const user = await User.me()
    dispatch(auth.actions.authStateChangedFulfilled(user))
  } catch (err) {
    unauthenticate()
  }
}

export const verifyUser = (user) => async (dispatch) => {
  try {
    dispatch(auth.actions.verifyUserPending())

    const nextUser = await User.verify(user)

    dispatch(auth.actions.verifyUserFulfilled(nextUser))

    return user
  } catch (err) {
    dispatch(auth.actions.verifyUserRejected(err.message))
    throw err
  }
}

export const isLoadingAuth = (state) => {
  return state.auth.isLoadingAuth
}

export const isLoadingUser = (state) => {
  return state.auth.isLoadingUser
}
