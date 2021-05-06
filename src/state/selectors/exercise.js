import { search } from '_utils/fuzzy-search'
import { sortAlphabetically } from '_utils/sort'
import { createSelector } from 'reselect'

export const getExercises = createSelector(
  [(exercises = []) => exercises, (_, query = '') => query],
  (exercises, query) => sortAlphabetically(search(exercises, query))
)
