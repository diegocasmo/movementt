import useSWR from 'swr'
import { Routine } from '_api'
import { search } from '_utils/fuzzy-search'

export const useRoutines = (query = '') => {
  const { data: routines, mutate } = useSWR('routines', Routine.fetch)
  const findById = (id) => routines.find((routine) => routine.id === id)

  const create = async (attrs) => {
    const data = await Routine.create(attrs)
    mutate((routines) => routines.concat(data), false)
    return data
  }

  const update = async (routine) => {
    const data = await Routine.update(routine)
    mutate(
      (routines) => routines.filter((r) => r.id !== data.id).concat(data),
      false
    )
    return data
  }

  const destroy = async (routine) => {
    await Routine.destroy(routine)
    mutate((routines) => routines.filter((r) => r.id !== routine.id), false)
  }

  return {
    routines: search(routines || [], query),
    loading: !routines,
    create,
    update,
    destroy,
    findById,
  }
}
