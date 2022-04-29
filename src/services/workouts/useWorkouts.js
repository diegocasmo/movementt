import { useQuery } from 'react-query'

import { makeApiService } from '_api/client'

const getWorkouts = makeApiService({
  path: 'workouts',
})

export const WORKOUTS_QUERY_KEY = ['workouts']

export const useWorkouts = () => useQuery(WORKOUTS_QUERY_KEY, getWorkouts)
