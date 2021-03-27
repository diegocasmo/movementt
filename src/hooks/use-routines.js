import useSWR from 'swr'
import { Routine } from '_api'
import { search } from '_utils/fuzzy-search'
import { createSelector } from 'reselect'
import { sortAlphabetically } from '_utils/sort'

export const useRoutines = (query = '') => {
  const { data: routines, mutate } = useSWR('routines', Routine.fetch)

  const findById = (id) => routines.find((routine) => routine.id === id)
  // TODO: Sort by position
  const getRoutines = createSelector(
    [(routines) => routines || [], (_, query) => query],
    (routines, query) => {
      return sortAlphabetically(search(routines, query))
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
