import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithRetry } from '_state/services/utils/baseQuery'

const routineType = 'Routines'
export const routineApi = createApi({
  reducerPath: 'routineApi',
  baseQuery: baseQueryWithRetry,
  tagTypes: [routineType],
  endpoints: (build) => ({
    getRoutines: build.query({
      query: () => ({ url: 'routines' }),
      providesTags: (result) => [
        ...result.map(({ id }) => ({ type: routineType, id })),
        { type: routineType, id: 'LIST' },
      ],
    }),
    createRoutine: build.mutation({
      query: (data) => {
        const { exercises, ...rest } = data
        const body = { ...rest, exercises_attributes: exercises }

        return {
          url: 'routines',
          method: 'POST',
          body,
        }
      },
      invalidatesTags: [{ type: routineType, id: 'LIST' }],
    }),
    updateRoutine: build.mutation({
      query(data) {
        const { id, exercises, ...rest } = data
        const body = { ...rest, exercises_attributes: exercises }

        return {
          url: `routines/${id}`,
          method: 'PUT',
          body,
        }
      },
      invalidatesTags: (_, __, { id }) => [{ type: routineType, id }],
    }),
    destroyRoutine: build.mutation({
      query: (id) => ({
        url: `routines/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, __, id) => [{ type: routineType, id }],
    }),
  }),
})

export const {
  useCreateRoutineMutation,
  useDestroyRoutineMutation,
  useGetRoutinesQuery,
  useUpdateRoutineMutation,
} = routineApi
