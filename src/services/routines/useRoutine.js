import { useQuery } from 'react-query'

import { makeApiService } from '_api/client'
import { ROUTINES_QUERY_KEY } from '_services/routines/useRoutines'
import { findRoutineById } from '_state/selectors/routine'

const getRoutines = makeApiService({
  path: 'routines',
})

export const useRoutine = (routineId) =>
  useQuery(ROUTINES_QUERY_KEY, getRoutines, {
    select: (data) => findRoutineById(data, routineId),
  })
