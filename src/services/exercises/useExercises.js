import { useQuery } from 'react-query'

import { makeApiService } from '_api/client'

const getExercises = makeApiService({
  path: 'exercises',
})

export const EXERCISES_QUERY_KEY = ['exercises']

export const useExercises = () => useQuery(EXERCISES_QUERY_KEY, getExercises)
