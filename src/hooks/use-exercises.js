import useSWR from 'swr'
import { Exercise } from '_api'
import { search } from '_utils/fuzzy-search'
import { createSelector } from 'reselect'
import { sortAlphabetically } from '_utils/sort'

export const useExercises = (query = '') => {
  const { data: exercises, mutate } = useSWR('exercises', Exercise.fetch)

  const getExercises = createSelector(
    [(exercises) => exercises || [], (_, query) => query],
    (exercises, query) => {
      return sortAlphabetically(search(exercises, query))
    }
  )

  const create = async (attrs) => {
    const data = await Exercise.create(attrs)
    mutate((exercises) => sortAlphabetically(exercises.concat(data)), false)
    return data
  }

  const update = async (exercise) => {
    const data = await Exercise.update(exercise)
    mutate(
      (exercises) =>
        sortAlphabetically(
          exercises.filter((e) => e.id !== data.id).concat(data)
        ),
      false
    )
    return data
  }

  const destroy = async (exercise) => {
    await Exercise.destroy(exercise)
    mutate((exercises) => exercises.filter((e) => e.id !== exercise.id), false)
  }

  return {
    exercises: getExercises(exercises, query),
    loading: !exercises,
    create,
    update,
    destroy,
  }
}
