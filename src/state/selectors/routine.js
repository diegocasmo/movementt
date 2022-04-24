import { search } from '_utils/fuzzy-search'
import { sortAlphabetically, sortByPosition } from '_utils/sort'

export const getRoutines = (routines = [], query = '') =>
  sortAlphabetically(search(routines, query)).map((routine) => ({
    ...routine,
    exercises: sortByPosition(routine.exercises),
  }))

export const findRoutineById = (routines = [], id = null) => {
  const routine = routines.find((routine) => routine.id === id)
  if (!routine) return null

  return {
    ...routine,
    exercises: sortByPosition(routine.exercises),
  }
}
