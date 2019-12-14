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
  signingUpError: null,

  // Signing in
  isSigningIn: false,
  signingInError: null,

  // Signing out
  isSigningOut: false,
  signingOutError: null,
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
      state.signingUpError = initialState.signingUpError
    },
    signUpSuccess(state) {
      state.isSigningUp = false
      state.signingUpError = initialState.signingUpError
    },
    signUpFailure(state, { payload }) {
      state.isSigningUp = false
      state.signingUpError = payload
    },
    signUpReset(state) {
      state.isSigningUp = initialState.isSigningUp
      state.signingUpError = initialState.signingUpError
    },

    // Signing in
    signInInit(state) {
      state.isSigningIn = true
      state.signingInError = initialState.signingInError
    },
    signInSuccess(state) {
      state.isSigningIn = false
      state.signingInError = initialState.signingInError
    },
    signInFailure(state, { payload }) {
      state.isSigningIn = false
      state.signingInError = payload
    },
    signInReset(state) {
      state.isSigningIn = initialState.isSigningIn
      state.signingInError = initialState.signingInError
    },

    // Signing out
    signOutInit(state) {
      state.isSigningOut = true
      state.signingOutError = initialState.signingOutError
    },
    signOutSuccess(state) {
      state.isSigningOut = false
      state.signingOutError = initialState.signingOutError
    },
    signOutFailure(state, { payload }) {
      state.isSigningOut = false
      state.signingOutError = payload
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
    dispatch(auth.actions.signUpFailure(err.message))
  }
}

export const signUpReset = () => dispatch => {
  dispatch(auth.actions.signUpReset())
}

export const signIn = (email, password) => async dispatch => {
  try {
    dispatch(auth.actions.signInInit())
    await signInWithEmailAndPassword(email, password)
    dispatch(auth.actions.signInSuccess())
  } catch (err) {
    dispatch(auth.actions.signInFailure(err.message))
  }
}

export const signInReset = () => dispatch => {
  dispatch(auth.actions.signInReset())
}

export const signOut = () => async dispatch => {
  try {
    dispatch(auth.actions.signOutInit())
    await signUserOut()
    dispatch(auth.actions.signOutSuccess())
  } catch (err) {
    dispatch(auth.actions.signOutFailure(err.message))
  }
}
