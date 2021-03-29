import useSWR from 'swr'
import { Routine } from '_api'
import { search } from '_utils/fuzzy-search'
import { createSelector } from 'reselect'
import { sortAlphabetically, sortByPosition } from '_utils/sort'

export const useRoutines = (query = '') => {
  const { data: routines, mutate } = useSWR('routines', Routine.fetch)

  const findById = createSelector(
    [(routines) => routines || [], (_, routineId) => routineId],
    (routines, routineId) => {
      const routine = routines.find((routine) => routine.id === routineId)

      if (!routine) return null

      return {
        ...routine,
        exercises: sortByPosition(routine.exercises),
      }
    }
  )

  const getRoutines = createSelector(
    [(routines) => routines || [], (_, query) => query],
    (routines, query) => {
      const list = sortAlphabetically(search(routines, query))

      return list.map((routine) => findById(routines, routine.id))
    }
  )

  const create = async (attrs) => {
    const data = await Routine.create(attrs)
    mutate((routines) => sortAlphabetically(routines.concat(data)), false)
    return data
  }

  const update = async (routine) => {
    const data = await Routine.update(routine)
    mutate(
      (routines) =>
        sortAlphabetically(
          routines.filter((r) => r.id !== data.id).concat(data)
        ),
      false
    )
    return data
  }

  const destroy = async (routine) => {
    await Routine.destroy(routine)
    mutate((routines) => routines.filter((r) => r.id !== routine.id), false)
  }

  return {
    routines: getRoutines(routines, query),
    loading: !routines,
    create,
    update,
    destroy,
    findById,
  }
}
