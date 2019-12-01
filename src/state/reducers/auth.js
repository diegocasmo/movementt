import { createSlice } from '@reduxjs/toolkit'
import { createUserWithEmailAndPassword } from '../../api/auth/sign-up'
import { signInWithEmailAndPassword } from '../../api/auth/sign-in'

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
  },
})

export const {
  authStateChangedSignIn,
  authStateChangedSignOut,
  signUpInit,
  signUpSuccess,
  signUpFailure,
  signInInit,
  signInSuccess,
  signInFailure,
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
    const user = await createUserWithEmailAndPassword(email, password)
    dispatch(signUpSuccess(user))
  } catch (err) {
    dispatch(signUpFailure())
  }
}

export const signIn = (email, password) => async dispatch => {
  try {
    dispatch(signInInit())
    const user = await signInWithEmailAndPassword(email, password)
    dispatch(signInSuccess())
  } catch (err) {
    dispatch(signInFailure())
  }
}
