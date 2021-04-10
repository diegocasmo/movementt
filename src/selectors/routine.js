import { search } from '_utils/fuzzy-search'
import { sortAlphabetically, sortByPosition } from '_utils/sort'
import { createSelector } from 'reselect'

export const getRoutines = createSelector(
  [(routines = []) => routines, (_, query = '') => query],
  (routines, query) => {
    const list = sortAlphabetically(search(routines, query))

    return list.map((routine) => {
      return {
        ...routine,
        exercises: sortByPosition(routine.exercises),
      }
    })
  }
)

export const findRoutineById = createSelector(
  [(routines = []) => routines, (_, id = -1) => id],
  (routines, id) => {
    const routine = routines.find((routine) => routine.id === id)
    if (!routine) return null

    return {
      ...routine,
      exercises: sortByPosition(routine.exercises),
    }
  }
)
