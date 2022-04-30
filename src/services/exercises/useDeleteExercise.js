import { useMutation, useQueryClient } from 'react-query'

import { makeApiService } from '_api/client'
import { EXERCISES_QUERY_KEY } from '_services/exercises/useExercises'

const deleteExercise = makeApiService({
  path: 'exercises/[id]',
  method: 'DELETE',
})

export const useDeleteExercise = () => {
  const queryClient = useQueryClient()

  return useMutation(deleteExercise, {
    onMutate: async ({ pathParams: { id: exerciseId } }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries(EXERCISES_QUERY_KEY)

      // Snapshot the previous value
      const previousExercises = queryClient.getQueryData(EXERCISES_QUERY_KEY)

      // Optimistically update to the new value
      queryClient.setQueryData(EXERCISES_QUERY_KEY, (old = []) =>
        old.filter((x) => x.id !== exerciseId)
      )

      // Return a context with the previous and new exercise
      return { previousExercises }
    },
    onError: (_, __, context) => {
      // If the mutation fails, use the context we returned above
      if (context) {
        queryClient.setQueryData(EXERCISES_QUERY_KEY, context.previousExercises)
      }
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries(EXERCISES_QUERY_KEY)
    },
  })
}
