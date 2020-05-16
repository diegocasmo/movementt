import { createSlice } from '@reduxjs/toolkit'
import { currentUser } from '../../api/current-user'

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
    reloadCurrentUserInit(state) {
      state.isReloadingCurrentUser = true
    },
    reloadCurrentUserSuccess(state) {
      state.isReloadingCurrentUser = false
    },
    reloadCurrentUserFailure(state) {
      state.isReloadingCurrentUser = false
    },
  },
})

export default auth.reducer

export const handleAuthStateChanged = (user) => (dispatch) => {
  if (!user) return dispatch(auth.actions.authStateChangedSignOut())

  const { uid, emailVerified } = user
  dispatch(auth.actions.authStateChangedSignIn({ uid, emailVerified }))
}

export const reloadCurrentUser = () => async (dispatch) => {
  try {
    dispatch(auth.actions.reloadCurrentUserInit())
    await currentUser().reload()
    const user = currentUser()
    // Update auth state when current user is reloaded
    dispatch(handleAuthStateChanged(user))
    dispatch(auth.actions.reloadCurrentUserSuccess())
    return user
  } catch (err) {
    dispatch(auth.actions.reloadCurrentUserFailure(err.message))
    throw err
  }
}

// Return the current user
export const getUser = (state) => {
  return state.auth.user
}
