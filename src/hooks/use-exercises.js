import React, { createContext, useContext, useEffect, useReducer } from 'react'
import PropTypes from 'prop-types'
import { createSelector } from 'reselect'
import { sortAlphabetically } from '_utils/sort'
import { Exercise } from '_api'
import { search } from '_utils/fuzzy-search'
import { showError } from '_utils/toast'

const ExercisesContext = createContext()

const actionTypes = {
  FETCH_PENDING: 'FETCH_PENDING',
  FETCH_FULFILLED: 'FETCH_FULFILLED',
  FETCH_REJECTED: 'FETCH_REJECTED',
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  DESTROY: 'DESTROY',
}

function exercisesReducer(state, { type, payload }) {
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

function ExercisesProvider({ children }) {
  const [state, dispatch] = useReducer(exercisesReducer, {
    items: [],
    loading: false,
  })

  const create = async (attrs) => {
    const data = await Exercise.create(attrs)
    dispatch({ type: actionTypes.CREATE, payload: data })
    return data
  }

  const update = async (exercise) => {
    const data = await Exercise.update(exercise)
    dispatch({ type: actionTypes.UPDATE, payload: data })
    return data
  }

  const destroy = async (exercise) => {
    await Exercise.destroy(exercise)
    dispatch({ type: actionTypes.DESTROY, payload: exercise })
  }

  const getExercises = createSelector(
    [(query) => query, (_, exercises = state.items) => exercises],
    (query, exercises) => sortAlphabetically(search(exercises, query))
  )

  const handleFetchExercises = async () => {
    dispatch({ type: actionTypes.FETCH_PENDING })

    try {
      const data = await Exercise.fetch()
      dispatch({ type: actionTypes.FETCH_FULFILLED, payload: data })
    } catch (err) {
      showError(err)
      dispatch({ type: actionTypes.FETCH_REJECTED })
    }
  }

  useEffect(() => {
    handleFetchExercises()
  }, [])

  const value = {
    loading: state.loading,
    getExercises,
    create,
    update,
    destroy,
  }

  return (
    <ExercisesContext.Provider value={value}>
      {children}
    </ExercisesContext.Provider>
  )
}

ExercisesProvider.propTypes = {
  children: PropTypes.node,
  initialState: PropTypes.object,
}

function useExercises() {
  const context = useContext(ExercisesContext)

  if (context === undefined) {
    throw new Error('useExercises must be used within a ExercisesProvider')
  }

  return context
}

export { ExercisesProvider, useExercises }
