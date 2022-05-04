import { useRoutines } from '_services/routines/useRoutines'
import { sortByAscPosition } from '_utils/sort'

export const useRoutine = (routineId) =>
  useRoutines({
    select: (routines = []) => {
      const routine = routines.find((routine) => routine.id === routineId)
      if (!routine) return null

      return {
        ...routine,
        exercises: sortByAscPosition(routine.exercises),
      }
    },
  })
