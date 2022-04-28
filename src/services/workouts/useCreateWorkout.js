import { useMutation, useQueryClient } from 'react-query'

import { makeApiService } from '_api/client'
import { WORKOUTS_QUERY_KEY } from '_services/workouts/useWorkouts'

const createWorkout = makeApiService({
  path: 'workouts',
  method: 'POST',
})

export const useCreateWorkout = () => {
  const queryClient = useQueryClient()

  return useMutation(createWorkout, {
    onMutate: async ({ bodyParams: newWorkout }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries(WORKOUTS_QUERY_KEY)

      // Snapshot the previous value
      const previousWorkoutss = queryClient.getQueryData(WORKOUTS_QUERY_KEY)

      // Optimistically update to the new value
      queryClient.setQueryData(WORKOUTS_QUERY_KEY, (old = []) => [
        ...old,
        // Temporarily assign an id so that lists can use it
        { id: new Date().getTime(), ...newWorkout },
      ])

      // Return a context object with the snapshotted value
      return { previousWorkoutss }
    },
    onError: (_, __, context) => {
      // Use context returned from onMutate to roll back
      queryClient.setQueryData(WORKOUTS_QUERY_KEY, context.previousWorkoutss)
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries(WORKOUTS_QUERY_KEY)
    },
  })
}
