import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '_state/services/utils/baseQuery'

const workoutType = 'Workouts'
export const workoutApi = createApi({
  reducerPath: 'workoutApi',
  baseQuery: baseQuery(),
  tagTypes: [workoutType],
  endpoints: (build) => ({
    getWorkouts: build.query({
      query: (page = 1) => ({ url: `workouts?page=${page}` }),
      providesTags: (result) => [
        ...result.map(({ id }) => ({ type: workoutType, id })),
        { type: workoutType, id: 'LIST' },
      ],
    }),
    createWorkout: build.mutation({
      query: (data) => {
        const { exercises, ...rest } = data
        const body = { ...rest, exercises_attributes: exercises }

        return {
          url: 'workouts',
          method: 'POST',
          body,
        }
      },
      invalidatesTags: [{ type: workoutType, id: 'LIST' }],
    }),
  }),
})

export const { useCreateWorkoutMutation, useGetWorkoutsQuery } = workoutApi
