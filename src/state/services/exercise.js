import { createApi } from '@rtk-incubator/rtk-query'
import { baseQueryWithRetry } from '_state/services/utils/baseUrl'

export const exerciseApi = createApi({
  reducerPath: 'exerciseApi',
  baseQuery: baseQueryWithRetry,
  entityTypes: ['Exercises'],
  endpoints: (build) => ({
    getExercises: build.query({
      query: () => ({ url: 'exercises' }),
      provides: (result) => [
        ...result.map(({ id }) => ({ type: 'Exercises', id })),
        { type: 'Exercises', id: 'LIST' },
      ],
    }),
    createExercise: build.mutation({
      query: (body) => ({
        url: 'exercises',
        method: 'POST',
        body,
      }),
      invalidates: [{ type: 'Exercises', id: 'LIST' }],
    }),
    updateExercise: build.mutation({
      query: ({ id, ...body }) => ({
        url: `exercises/${id}`,
        method: 'PUT',
        body,
      }),
      invalidates: (_, { id }) => [{ type: 'Exercises', id }],
    }),
    destroyExercise: build.mutation({
      query: (id) => ({
        url: `exercises/${id}`,
        method: 'DELETE',
      }),
      invalidates: (_, id) => [{ type: 'Exercises', id }],
    }),
  }),
})

export const {
  useCreateExerciseMutation,
  useDestroyExerciseMutation,
  useGetExercisesQuery,
  useUpdateExerciseMutation,
} = exerciseApi
