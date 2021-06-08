import React, { createContext, useContext, useReducer } from 'react'
import PropTypes from 'prop-types'
import { User } from '_api'
import { showError } from '_utils/toast'

const UserContext = createContext()

const actionTypes = {
  FETCH_PENDING: 'FETCH_PENDING',
  FETCH_FULFILLED: 'FETCH_FULFILLED',
  FETCH_REJECTED: 'FETCH_REJECTED',
  UPDATE: 'UPDATE',
  CLEAR: 'CLEAR',
}

function userReducer(state, { type, payload }) {
  switch (type) {
    case actionTypes.FETCH_PENDING: {
      return { ...state, isLoading: true }
    }
    case actionTypes.FETCH_FULFILLED: {
      return { ...state, data: payload, isLoading: false }
    }
    case actionTypes.FETCH_REJECTED: {
      return { ...state, isLoading: false }
    }

    case actionTypes.UPDATE: {
      return { ...state, data: payload }
    }

    case actionTypes.CLEAR: {
      return { ...state, data: null, isLoading: false }
    }
    default: {
      throw new Error(`Unhandled action type: ${type}`)
    }
  }
}

function UserProvider({ children }) {
  const [{ data, isLoading }, dispatch] = useReducer(userReducer, {
    data: null,
    isLoading: false,
  })

  const handleFetch = async () => {
    dispatch({ type: actionTypes.FETCH_PENDING })

    try {
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

  const handleClear = () => {
    dispatch({ type: actionTypes.CLEAR })
  }

  const value = {
    isLoading,
    user: data,
    fetch: handleFetch,
    update: handleUpdate,
    clear: handleClear,
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
