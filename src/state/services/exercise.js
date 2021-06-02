import { createApi } from '@rtk-incubator/rtk-query/react'
import { baseQueryWithRetry } from '_state/services/utils/baseQuery'

const exerciseType = 'Exercises'
export const exerciseApi = createApi({
  reducerPath: 'exerciseApi',
  baseQuery: baseQueryWithRetry,
  tagTypes: [exerciseType],
  endpoints: (build) => ({
    getExercises: build.query({
      query: () => ({ url: 'exercises' }),
      providesTags: (result) => [
        ...result.map(({ id }) => ({ type: exerciseType, id })),
        { type: exerciseType, id: 'LIST' },
      ],
    }),
    createExercise: build.mutation({
      query: (body) => ({
        url: 'exercises',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: exerciseType, id: 'LIST' }],
    }),
    updateExercise: build.mutation({
      query: ({ id, ...body }) => ({
        url: `exercises/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (_, __, { id }) => [{ type: exerciseType, id }],
    }),
    destroyExercise: build.mutation({
      query: (id) => ({
        url: `exercises/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, __, id) => [{ type: exerciseType, id }],
    }),
  }),
})

export const {
  useCreateExerciseMutation,
  useDestroyExerciseMutation,
  useGetExercisesQuery,
  useUpdateExerciseMutation,
} = exerciseApi