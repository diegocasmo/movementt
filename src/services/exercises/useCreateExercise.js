import { useMutation, useQueryClient } from 'react-query'

import { makeApiService } from '_api/client'
import { EXERCISES_QUERY_KEY } from '_services/exercises/useExercises'

const createExercise = makeApiService({
  path: 'exercises',
  method: 'POST',
})

export const useCreateExercise = () => {
  const queryClient = useQueryClient()

  return useMutation(createExercise, {
    onMutate: async ({ bodyParams: newExercise }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries(EXERCISES_QUERY_KEY)

      // Snapshot the previous value
      const previousExercisess = queryClient.getQueryData(EXERCISES_QUERY_KEY)

      // Optimistically update to the new value
      queryClient.setQueryData(EXERCISES_QUERY_KEY, (old = []) => [
        ...old,
        // Temporarily assign an id so that lists can use it
        { id: new Date().getTime(), ...newExercise },
      ])

      // Return a context object with the snapshotted value
      return { previousExercisess }
    },
    onError: (_, __, context) => {
      // Use context returned from onMutate to roll back
      queryClient.setQueryData(EXERCISES_QUERY_KEY, context.previousExercisess)
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries(EXERCISES_QUERY_KEY)
    },
  })
}
