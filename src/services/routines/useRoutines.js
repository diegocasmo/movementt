import { useQuery } from 'react-query'

import { makeApiService } from '_api/client'

const getRoutines = makeApiService({
  path: 'routines',
})

export const ROUTINES_QUERY_KEY = ['routines']

export const useRoutines = (options = {}) =>
  useQuery(ROUTINES_QUERY_KEY, getRoutines, options)
