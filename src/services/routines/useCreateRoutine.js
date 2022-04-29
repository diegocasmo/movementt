import { useMutation, useQueryClient } from 'react-query'

import { makeApiService } from '_api/client'
import { ROUTINES_QUERY_KEY } from '_services/routines/useRoutines'

const createRoutine = makeApiService({
  path: 'routines',
  method: 'POST',
})

export const useCreateRoutine = () => {
  const queryClient = useQueryClient()

  return useMutation(createRoutine, {
    onMutate: async ({ bodyParams: newRoutine }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries(ROUTINES_QUERY_KEY)

      // Snapshot the previous value
      const previousRoutines = queryClient.getQueryData(ROUTINES_QUERY_KEY)

      // Optimistically update to the new value
      queryClient.setQueryData(ROUTINES_QUERY_KEY, (old = []) => [
        ...old,
        // Temporarily assign an id so that lists can use it
        { id: new Date().getTime(), ...newRoutine },
      ])

      // Return a context object with the snapshotted value
      return { previousRoutines }
    },
    onError: (_, __, context) => {
      // Use context returned from onMutate to roll back
      queryClient.setQueryData(ROUTINES_QUERY_KEY, context.previousRoutines)
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries(ROUTINES_QUERY_KEY)
    },
  })
}
