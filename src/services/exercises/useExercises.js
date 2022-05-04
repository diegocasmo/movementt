import { useQuery, useQueryClient } from 'react-query'

import { makeApiService } from '_api/client'

const getExercises = makeApiService({
  path: 'exercises',
})

export const EXERCISES_QUERY_KEY = ['exercises']

export const useInvalidateExercises = () => {
  const queryClient = useQueryClient()

  return {
    invalidateExercises: async () =>
      queryClient.invalidateQueries(EXERCISES_QUERY_KEY),
  }
}

export const useExercises = () => useQuery(EXERCISES_QUERY_KEY, getExercises)
