import React, { createContext, useContext, useEffect, useReducer } from 'react'
import PropTypes from 'prop-types'
import { User } from '_api'
import { showError } from '_utils/toast'

const UserContext = createContext()

const actionTypes = {
  AUTH_STATE_CHANGED: 'AUTH_STATE_CHANGED',

  GET_PENDING: 'GET_PENDING',
  GET_FULFILLED: 'GET_FULFILLED',
  GET_REJECTED: 'GET_REJECTED',

  UPDATE: 'UPDATE',

  CLEAR: 'CLEAR',
}

function userReducer(state, { type, payload }) {
  switch (type) {
    case actionTypes.AUTH_STATE_CHANGED: {
      return { ...state, isLoadingAuth: false }
    }

    case actionTypes.GET_PENDING: {
      return { ...state, isLoadingUser: true }
    }
    case actionTypes.GET_FULFILLED: {
      return { ...state, data: payload, isLoadingUser: false }
    }
    case actionTypes.GET_REJECTED: {
      return { ...state, isLoadingUser: false }
    }

    case actionTypes.UPDATE: {
      return { ...state, data: payload }
    }

    case actionTypes.CLEAR: {
      return { ...state, data: null, isLoadingUser: false }
    }

    default: {
      throw new Error(`Unhandled action type: ${type}`)
    }
  }
}

function UserProvider({ children }) {
  const [{ data, isLoadingUser, isLoadingAuth }, dispatch] = useReducer(
    userReducer,
    {
      data: null,
      isLoadingAuth: true,
      isLoadingUser: false,
    }
  )

  const handleGet = async () => {
    dispatch({ type: actionTypes.GET_PENDING })

    try {
      const data = await User.me()
      dispatch({ type: actionTypes.GET_FULFILLED, payload: data })
    } catch (err) {
      dispatch({ type: actionTypes.GET_REJECTED })
    }
  }

  const handleUpdate = async (user) => {
    const data = await User.update(user)
    dispatch({ type: actionTypes.UPDATE, payload: data })
  }

  const handleCreate = async (email, password) => {
    await User.createUserWithEmailAndPassword(email, password)
    await handleSignIn(email, password)
    User.sendEmailVerification()
  }

  const handleSignIn = async (email, password) => {
    try {
      await User.signInWithEmailAndPassword(email, password)
      await handleGet()
    } catch (err) {
      showError(err)
    }
  }

  const handleSignOut = async () => {
    try {
      await User.signOut()
    } catch (err) {
      showError(err)
    } finally {
      dispatch({ type: actionTypes.CLEAR })
    }
  }

  // Listen to Firebase authentication state changes
  useEffect(() => {
    const unsubscribe = User.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        await handleGet()
      } else {
        await handleSignOut()
      }

      dispatch({ type: actionTypes.AUTH_STATE_CHANGED })
    })

    return () => {
      unsubscribe()
    }
  }, [])

  const value = {
    isLoadingUser,
    isLoadingAuth,
    user: data,
    signIn: handleSignIn,
    signOut: handleSignOut,
    create: handleCreate,
    update: handleUpdate,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

UserProvider.propTypes = {
  children: PropTypes.node,
  initialState: PropTypes.object,
}

function useUser() {
  const context = useContext(UserContext)

  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }

  return context
}

export { UserProvider, useUser }
