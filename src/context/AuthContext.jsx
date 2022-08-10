import PropTypes from 'prop-types'
import { useQueryClient } from 'react-query'
import React, { createContext, useContext, useReducer } from 'react'

import {
  useSignIn,
  useSignOut,
  useSignUp,
  useUpdateUser,
  useUpdatePassword,
  useReauthenticate,
  useSendPasswordReset,
} from '_services/users'
import { EXERCISES_QUERY_KEY } from '_services/exercises'
import { ROUTINES_QUERY_KEY } from '_services/routines'
import { WORKOUTS_QUERY_KEY } from '_services/workouts'

const AuthContext = createContext()

const actionTypes = {
  SET_USER: 'SET_USER',
  SET_IS_LOADING: 'SET_IS_LOADING',
}

function authReducer(state, { type, payload }) {
  switch (type) {
    case actionTypes.SET_USER: {
      return { ...state, user: payload }
    }
    case actionTypes.SET_IS_LOADING: {
      return { ...state, isLoading: payload }
    }

    default: {
      throw new Error(`Unhandled action type: ${type}`)
    }
  }
}

const initialState = {
  isLoading: true,
  user: null,
}

export function AuthProvider({ children }) {
  const queryClient = useQueryClient()
  const [{ user, isLoading }, dispatch] = useReducer(authReducer, initialState)

  const setIsLoading = (isLoading) =>
    dispatch({ type: actionTypes.SET_IS_LOADING, payload: isLoading })

  const signUp = useSignUp()
  const signIn = useSignIn({
    onSuccess: (user) => {
      dispatch({ type: actionTypes.SET_USER, payload: user })
    },
  })
  const signOut = useSignOut({
    onMutate: () => {
      dispatch({ type: actionTypes.SET_USER, payload: null })

      return { user }
    },
    // TODO: Reset session
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries(EXERCISES_QUERY_KEY),
        queryClient.invalidateQueries(ROUTINES_QUERY_KEY),
        queryClient.invalidateQueries(WORKOUTS_QUERY_KEY),
      ])
    },
    onError: (_, __, context) => {
      dispatch({ type: actionTypes.SET_USER, payload: context.user })
    },
  })
  const update = useUpdateUser({
    onSuccess: async (user) => {
      dispatch({ type: actionTypes.SET_USER, payload: user })
      await queryClient.invalidateQueries(ROUTINES_QUERY_KEY)
    },
  })

  const updatePassword = useUpdatePassword()
  const reauthenticate = useReauthenticate()
  const sendPasswordReset = useSendPasswordReset()

  const value = {
    isLoading,
    setIsLoading,
    user,
    signIn,
    signOut,
    signUp,
    update,
    updatePassword,
    reauthenticate,
    sendPasswordReset,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

AuthProvider.propTypes = {
  children: PropTypes.node,
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider')
  }

  return context
}
