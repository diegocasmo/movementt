import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '_state/services/utils/baseQuery'

const exerciseType = 'Exercises'
export const exerciseApi = createApi({
  reducerPath: 'exerciseApi',
  baseQuery: baseQuery(),
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
