import { createSlice } from '@reduxjs/toolkit'
import User from '_api/user'
import { resetExercises } from '_state/reducers/exercises'
import { resetRoutines } from '_state/reducers/routines'
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
    verifyUserFulfilled(state) {
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
    dispatch(resetExercises())
    dispatch(resetRoutines())
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

export const verifyUser = () => async (dispatch, getState) => {
  try {
    dispatch(auth.actions.verifyUserPending())

    const user = await User.verify(getUser(getState()))

    // Update auth state when current user is verified
    dispatch(handleAuthStateChanged(user))
    dispatch(auth.actions.verifyUserFulfilled())

    return user
  } catch (err) {
    dispatch(auth.actions.verifyUserRejected(err.message))
    throw err
  }
}

export const getUser = (state) => {
  return state.auth.user
}

export const isLoadingAuth = (state) => {
  return state.auth.isLoadingAuth
}

export const isLoadingUser = (state) => {
  return state.auth.isLoadingUser
}
