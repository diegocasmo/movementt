import useSWR from 'swr'
import { Exercise } from '_api'
import { search } from '_utils/fuzzy-search'

export const useExercises = (query = '') => {
  const { data: exercises, mutate } = useSWR('exercises', Exercise.fetch)

  const create = async (attrs) => {
    const data = await Exercise.create(attrs)

    mutate((exercises) => exercises.concat(data), false)
  }

  const update = async (exercise) => {
    const data = await Exercise.update(exercise)

    mutate(
      (exercises) => exercises.filter((e) => e.id !== data.id).concat(data),
      false
    )
  }

  const destroy = async (exercise) => {
    await Exercise.destroy(exercise)

    mutate((exercises) => exercises.filter((e) => e.id !== exercise.id), false)
  }

  return {
    exercises: search(exercises || [], query),
    loading: !exercises,
    create,
    update,
    destroy,
  }
}