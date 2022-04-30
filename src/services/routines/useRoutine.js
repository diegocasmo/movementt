import { useRoutines } from '_services/routines/useRoutines'
import { findRoutineById } from '_state/selectors/routine'

export const useRoutine = (routineId) =>
  useRoutines({
    select: (data) => findRoutineById(data, routineId),
  })
