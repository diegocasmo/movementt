import { useInfiniteQuery, useQueryClient } from 'react-query'

import { makeApiService } from '_api/client'
import { MAX_PER_PAGE } from '_services/config/pagination'

const getWorkouts = makeApiService({
  path: 'workouts',
})

export const WORKOUTS_QUERY_KEY = ['workouts']

export const useInvalidateWorkouts = () => {
  const queryClient = useQueryClient()

  return {
    invalidateWorkouts: async () =>
      queryClient.invalidateQueries(WORKOUTS_QUERY_KEY),
  }
}

export const useWorkouts = () =>
  useInfiniteQuery(
    WORKOUTS_QUERY_KEY,
    ({ pageParam = 1 }) => getWorkouts({ queryParams: { page: pageParam } }),
    {
      getNextPageParam: (lastPage = [], allPages) =>
        lastPage.length < MAX_PER_PAGE ? undefined : allPages.length + 1,
    }
  )
