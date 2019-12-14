import { createSlice } from '@reduxjs/toolkit'
import { createUserWithEmailAndPassword } from '../../api/auth/sign-up'
import { signInWithEmailAndPassword } from '../../api/auth/sign-in'
import { signOut as signUserOut } from '../../api/auth/sign-out'

const initialState = {
  uid: null,

  // Load authentication
  isLoadingAuth: true,
  hasLoadingAuthError: false,

  // Signing up
  isSigningUp: false,
  hasSigningUpError: false,

  // Signing in
  isSigningIn: false,
  hasSigningInError: false,

  // Signing out
  isSigningOut: false,
  hasSigningOutError: false,
}

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Load authentication
    authStateChangedSignIn(state, { payload }) {
      state.uid = payload
      state.isLoadingAuth = false
    },
    authStateChangedSignOut(state) {
      state.isLoadingAuth = false
      state.uid = null
    },

    // Signing up
    signUpInit(state) {
      state.isSigningUp = true
      state.hasSigningUpError = false
    },
    signUpSuccess(state, payload) {
      state.isSigningUp = false
      state.hasSigningUpError = false
    },
    signUpFailure(state) {
      state.isSigningUp = false
      state.hasSigningUpError = true
    },
    signUpReset(state) {
      state.isSigningUp = false
      state.hasSigningUpError = false
    },

    // Signing in
    signInInit(state) {
      state.isSigningIn = true
      state.hasSigningInError = false
    },
    signInSuccess(state, payload) {
      state.isSigningIn = false
      state.hasSigningInError = false
    },
    signInFailure(state) {
      state.isSigningIn = false
      state.hasSigningInError = true
    },
    signInReset(state) {
      state.isSigningIn = false
      state.hasSigningInError = false
    },

    // Signing out
    signOutInit(state) {
      state.isSigningOut = true
      state.hasSigningOutError = false
    },
    signOutSuccess(state, payload) {
      state.isSigningOut = false
      state.hasSigningOutError = false
    },
    signOutFailure(state) {
      state.isSigningOut = false
      state.hasSigningOutError = true
    },
  },
})

export const {
  // Load authentication
  authStateChangedSignIn,
  authStateChangedSignOut,

  // Sign Up
  signUpInit,
  signUpSuccess,
  signUpFailure,
  signUpReset,

  // Sign In
  signInInit,
  signInSuccess,
  signInFailure,
  signInReset,

  // Sign Out
  signOutInit,
  signOutSuccess,
  signOutFailure,
} = auth.actions

export default auth.reducer

export const handleAuthStateChanged = user => dispatch => {
  if (user) {
    dispatch(authStateChangedSignIn(user.uid))
  } else {
    dispatch(authStateChangedSignOut())
  }
}

export const signUp = (email, password) => async dispatch => {
  try {
    dispatch(signUpInit())
    await createUserWithEmailAndPassword(email, password)
    dispatch(signUpSuccess())
  } catch (err) {
    dispatch(signUpFailure())
  }
}

export const signUpClear = () => dispatch => {
  dispatch(signUpReset())
}

export const signIn = (email, password) => async dispatch => {
  try {
    dispatch(signInInit())
    await signInWithEmailAndPassword(email, password)
    dispatch(signInSuccess())
  } catch (err) {
    dispatch(signInFailure())
  }
}

export const signInClear = () => dispatch => {
  dispatch(signInReset())
}

export const signOut = () => async dispatch => {
  try {
    dispatch(signOutInit())
    await signUserOut()
    dispatch(signOutSuccess())
  } catch (err) {
    dispatch(signOutFailure())
  }
}
