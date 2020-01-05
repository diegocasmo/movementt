import { createSlice } from '@reduxjs/toolkit'
import { createUserWithEmailAndPassword } from '../../api/auth/sign-up'
import { signInWithEmailAndPassword } from '../../api/auth/sign-in'
import { signOut as signUserOut } from '../../api/auth/sign-out'
import { sendEmailVerification } from '../../api/user/send-email-verification'
import { currentUser } from '../../api/user/current-user'

const initialState = {
  user: null,

  // Load authentication
  isLoadingAuth: true,

  // Reload current user
  isReloadingCurrentUser: false,

  // Signing up
  isSigningUp: false,

  // Signing in
  isSigningIn: false,

  // Verification
  isSendingVerification: false,

  // Signing out
  isSigningOut: false,
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

    // Signing up
    signUpInit(state) {
      state.isSigningUp = true
    },
    signUpSuccess(state) {
      state.isSigningUp = false
    },
    signUpFailure(state) {
      state.isSigningUp = false
    },
    signUpReset(state) {
      state.isSigningUp = initialState.isSigningUp
    },

    // Signing in
    signInInit(state) {
      state.isSigningIn = true
    },
    signInSuccess(state) {
      state.isSigningIn = false
    },
    signInFailure(state) {
      state.isSigningIn = false
    },
    signInReset(state) {
      state.isSigningIn = initialState.isSigningIn
    },

    // Verification
    sendVerificationInit(state) {
      state.isSendingVerification = true
    },
    sendVerificationSuccess(state) {
      state.isSendingVerification = false
    },
    sendVerificationFailure(state) {
      state.isSendingVerification = false
    },

    // Signing out
    signOutInit(state) {
      state.isSigningOut = true
    },
    signOutSuccess(state) {
      state.isSigningOut = false
    },
    signOutFailure(state) {
      state.isSigningOut = false
    },
  },
})

export default auth.reducer

export const handleAuthStateChanged = user => dispatch => {
  if (!user) return dispatch(auth.actions.authStateChangedSignOut())

  const { uid, emailVerified } = user
  dispatch(auth.actions.authStateChangedSignIn({ uid, emailVerified }))
}

export const reloadCurrentUser = () => async dispatch => {
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

export const signUp = (email, password) => async dispatch => {
  try {
    dispatch(auth.actions.signUpInit())
    await createUserWithEmailAndPassword(email, password)
    // Automatically send verification email
    sendEmailVerification(currentUser())
    dispatch(auth.actions.signUpSuccess())
  } catch (err) {
    dispatch(auth.actions.signUpFailure(err.message))
    throw err
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
    throw err
  }
}

export const signInReset = () => dispatch => {
  dispatch(auth.actions.signInReset())
}

export const sendVerification = user => async dispatch => {
  try {
    dispatch(auth.actions.sendVerificationInit())
    await sendEmailVerification(user)
    dispatch(auth.actions.sendVerificationSuccess())
  } catch (err) {
    dispatch(auth.actions.sendVerificationFailure(err.message))
    throw err
  }
}

export const signOut = () => async dispatch => {
  try {
    dispatch(auth.actions.signOutInit())
    await signUserOut()
    dispatch(auth.actions.signOutSuccess())
  } catch (err) {
    dispatch(auth.actions.signOutFailure(err.message))
    throw err
  }
}
