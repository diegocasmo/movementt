import React, { createContext, useContext, useEffect, useReducer } from 'react'
import PropTypes from 'prop-types'
import { createSelector } from 'reselect'
import { sortAlphabetically, sortByPosition } from '_utils/sort'
import { Routine } from '_api'
import { search } from '_utils/fuzzy-search'
import { showError } from '_utils/toast'

const RoutinesContext = createContext()

const actionTypes = {
  FETCH_PENDING: 'FETCH_PENDING',
  FETCH_FULFILLED: 'FETCH_FULFILLED',
  FETCH_REJECTED: 'FETCH_REJECTED',
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  DESTROY: 'DESTROY',
}

function routinesReducer(state, { type, payload }) {
  switch (type) {
    case actionTypes.FETCH_PENDING: {
      return { ...state, loading: true }
    }
    case actionTypes.FETCH_FULFILLED: {
      return { ...state, items: payload, loading: false }
    }
    case actionTypes.FETCH_REJECTED: {
      return { ...state, loading: false }
    }

    case actionTypes.CREATE: {
      return {
        ...state,
        items: state.items.concat(payload),
      }
    }

    case actionTypes.UPDATE: {
      return {
        ...state,
        items: state.items.filter((i) => i.id !== payload.id).concat(payload),
      }
    }

    case actionTypes.DESTROY: {
      return {
        ...state,
        items: state.items.filter((i) => i.id !== payload.id),
      }
    }

    default: {
      throw new Error(`Unhandled action type: ${type}`)
    }
  }
}

function RoutinesProvider({ children }) {
  const [state, dispatch] = useReducer(routinesReducer, {
    items: [],
    loading: false,
  })

  const create = async (attrs) => {
    const data = await Routine.create(attrs)
    dispatch({ type: actionTypes.CREATE, payload: data })
    return data
  }

  const update = async (routine) => {
    const data = await Routine.update(routine)
    dispatch({ type: actionTypes.UPDATE, payload: data })
    return data
  }

  const destroy = async (routine) => {
    await Routine.destroy(routine)
    dispatch({ type: actionTypes.DESTROY, payload: routine })
  }

  const findById = createSelector(
    [(routineId) => routineId, (_, routines = state.items) => routines],
    (routineId, routines) => {
      const routine = routines.find((routine) => routine.id === routineId)

      if (!routine) return null

      return {
        ...routine,
        exercises: sortByPosition(routine.exercises),
      }
    }
  )

  const getRoutines = createSelector(
    [(query) => query, (_, routines = state.items) => routines],
    (query, routines) => {
      const list = sortAlphabetically(search(routines, query))

      return list.map((routine) => findById(routine.id))
    }
  )

  const handleFetchRoutines = async () => {
    dispatch({ type: actionTypes.FETCH_PENDING })

    try {
      const data = await Routine.fetch()
      dispatch({ type: actionTypes.FETCH_FULFILLED, payload: data })
    } catch (err) {
      showError(err)
      dispatch({ type: actionTypes.FETCH_REJECTED })
    }
  }

  useEffect(() => {
    handleFetchRoutines()
  }, [])

  const value = {
    loading: state.loading,
    getRoutines,
    findById,
    create,
    update,
    destroy,
  }

  return (
    <RoutinesContext.Provider value={value}>
      {children}
    </RoutinesContext.Provider>
  )
}

RoutinesProvider.propTypes = {
  children: PropTypes.node,
  initialState: PropTypes.object,
}

function useRoutines() {
  const context = useContext(RoutinesContext)

  if (context === undefined) {
    throw new Error('useRoutines must be used within a RoutinesProvider')
  }

  return context
}

export { RoutinesProvider, useRoutines }
