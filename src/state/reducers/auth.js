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

export default auth.reducer

export const handleAuthStateChanged = user => dispatch => {
  if (user) {
    dispatch(auth.actions.authStateChangedSignIn(user.uid))
  } else {
    dispatch(auth.actions.authStateChangedSignOut())
  }
}

export const signUp = (email, password) => async dispatch => {
  try {
    dispatch(auth.actions.signUpInit())
    await createUserWithEmailAndPassword(email, password)
    dispatch(auth.actions.signUpSuccess())
  } catch (err) {
    dispatch(signUpFailure())
  }
}

export const signIn = (email, password) => async dispatch => {
  try {
    dispatch(auth.actions.signInInit())
    await signInWithEmailAndPassword(email, password)
    dispatch(auth.actions.signInSuccess())
  } catch (err) {
    dispatch(auth.actions.signInFailure())
  }
}

export const signOut = () => async dispatch => {
  try {
    dispatch(auth.actions.signOutInit())
    await signUserOut()
    dispatch(auth.actions.signOutSuccess())
  } catch (err) {
    dispatch(auth.actions.signOutFailure())
  }
}
