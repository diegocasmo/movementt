import { search } from '_utils/fuzzy-search'
import { sortAlphabetically } from '_utils/sort'

export const getExercises = (exercises = [], query = '') =>
  sortAlphabetically(search(exercises, query))
