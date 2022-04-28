import { useQuery } from 'react-query'

import { makeApiService } from '_api/client'

const getRoutines = makeApiService({
  path: 'routines',
})

export const ROUTINES_QUERY_KEY = ['routines']

export const invalidateRoutines = async (queryClient) =>
  queryClient.invalidateQueries(ROUTINES_QUERY_KEY)

export const useRoutines = () => useQuery(ROUTINES_QUERY_KEY, getRoutines)
