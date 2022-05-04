import { search } from '_utils/fuzzy-search'
import { sortAlphabetically, sortByAscPosition } from '_utils/sort'

export const getRoutines = (routines = [], query = '') =>
  sortAlphabetically(search(routines, query)).map((routine) => ({
    ...routine,
    exercises: sortByAscPosition(routine.exercises),
  }))
