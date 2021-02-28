import { createSlice } from '@reduxjs/toolkit'
import User from '_api/user'
import { resetExercises } from '_state/reducers/exercises'
import { resetRoutines } from '_state/reducers/routines'
import { resetWorkouts } from '_state/reducers/workouts'
import { resetWorkout } from '_features/create-workout/reducers/create-workout'

const initialState = {
  user: null,

  // Load authentication
  isLoadingAuth: true,

  // Reload current user
  isReloadingCurrentUser: false,
}

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Load authentication
    authStateChangedSignIn(state, { payload }) {
      state.user = payload
      state.isLoadingAuth = false
    },
    authStateChangedSignOut(state) {
      state.isLoadingAuth = false
      state.user = null
    },

    // Reload current user
    verifyCurrentUserInit(state) {
      state.isReloadingCurrentUser = true
    },
    verifyCurrentUserSuccess(state) {
      state.isReloadingCurrentUser = false
    },
    verifyCurrentUserFailure(state) {
      state.isReloadingCurrentUser = false
    },
  },
})

export default auth.reducer

export const handleAuthStateChanged = (authenticated) => async (dispatch) => {
  const unauthenticate = () => {
    User.signOut()
    User.removeToken()
    dispatch(resetExercises())
    dispatch(resetRoutines())
    dispatch(resetWorkouts())
    dispatch(resetWorkout())
    dispatch(auth.actions.authStateChangedSignOut())
  }

  if (!authenticated) {
    return unauthenticate()
  }

  await User.setToken()
  const user = await User.get()
  dispatch(auth.actions.authStateChangedSignIn(user))
}

export const verifyCurrentUser = () => async (dispatch, getState) => {
  try {
    dispatch(auth.actions.verifyCurrentUserInit())

    const user = await User.verify(getUser(getState()))

    // Update auth state when current user is verified
    dispatch(handleAuthStateChanged(user))
    dispatch(auth.actions.verifyCurrentUserSuccess())

    return user
  } catch (err) {
    dispatch(auth.actions.verifyCurrentUserFailure(err.message))
    throw err
  }
}

// Return the current user
export const getUser = (state) => {
  return state.auth.user
}
