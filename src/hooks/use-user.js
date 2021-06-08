import React, { createContext, useContext, useEffect, useReducer } from 'react'
import PropTypes from 'prop-types'
import { User } from '_api'
import { showError } from '_utils/toast'

const UserContext = createContext()

const actionTypes = {
  AUTH_STATE_PENDING: 'AUTH_STATE_PENDING',
  AUTH_STATE_FULFILLED: 'AUTH_STATE_FULFILLED',
  AUTH_STATE_REJECTED: 'AUTH_STATE_REJECTED',
  FETCH_PENDING: 'FETCH_PENDING',
  FETCH_FULFILLED: 'FETCH_FULFILLED',
  FETCH_REJECTED: 'FETCH_REJECTED',
  UPDATE: 'UPDATE',
  CLEAR: 'CLEAR',
}

function userReducer(state, { type, payload }) {
  switch (type) {
    case actionTypes.AUTH_STATE_PENDING: {
      return { ...state, isLoadingAuth: true }
    }
    case actionTypes.AUTH_STATE_FULFILLED: {
      return { ...state, isLoadingAuth: false }
    }
    case actionTypes.AUTH_STATE_REJECTED: {
      return { ...state, isLoadingAuth: false }
    }

    case actionTypes.FETCH_PENDING: {
      return { ...state, isLoadingUser: true }
    }
    case actionTypes.FETCH_FULFILLED: {
      return { ...state, data: payload, isLoadingUser: false }
    }
    case actionTypes.FETCH_REJECTED: {
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

  const handleSignIn = async (email, password) => {
    dispatch({ type: actionTypes.FETCH_PENDING })

    try {
      await User.signInWithEmailAndPassword(email, password)
      const data = await User.me()
      dispatch({ type: actionTypes.FETCH_FULFILLED, payload: data })
    } catch (err) {
      showError(err)
      dispatch({ type: actionTypes.FETCH_REJECTED })
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

  const handleSignOut = async () => {
    await User.signOut()
    dispatch({ type: actionTypes.CLEAR })
  }

  // Listen to Firebase authentication state changes
  useEffect(() => {
    const unsubscribe = User.onAuthStateChanged(async (firebaseUser) => {
      dispatch({ type: actionTypes.AUTH_STATE_FULFILLED })

      if (!firebaseUser) {
        handleSignOut()
      }
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
