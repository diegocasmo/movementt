import { useMutation, useQueryClient } from 'react-query'

import { makeApiService } from '_api/client'
import { ROUTINES_QUERY_KEY } from '_services/routines/useRoutines'

const updateRoutine = makeApiService({
  path: 'routines/[id]',
  method: 'PUT',
})

export const useUpdateRoutine = () => {
  const queryClient = useQueryClient()

  return useMutation(updateRoutine, {
    onMutate: async ({ bodyParams: newRoutine }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries(ROUTINES_QUERY_KEY)

      // Snapshot the previous value
      const previousRoutines = queryClient.getQueryData(ROUTINES_QUERY_KEY)

      // Optimistically update to the new value
      queryClient.setQueryData(ROUTINES_QUERY_KEY, (old = []) =>
        old.map((x) => (x.id === newRoutine.id ? newRoutine : x))
      )

      // Return a context with the previous and new routine
      return { previousRoutines }
    },
    onError: (_, __, context) => {
      // If the mutation fails, use the context we returned above
      if (context) {
        queryClient.setQueryData(ROUTINES_QUERY_KEY, context.previousRoutines)
      }
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries(ROUTINES_QUERY_KEY)
    },
  })
}
