import { createApi } from '@rtk-incubator/rtk-query'
import { baseQueryWithRetry } from '_state/services/utils/baseUrl'

export const routineApi = createApi({
  reducerPath: 'routineApi',
  baseQuery: baseQueryWithRetry,
  entityTypes: ['Routines'],
  endpoints: (build) => ({
    getRoutines: build.query({
      query: () => ({ url: 'routines' }),
      provides: (result) => [
        ...result.map(({ id }) => ({ type: 'Routines', id })),
        { type: 'Routines', id: 'LIST' },
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
      invalidates: [{ type: 'Routines', id: 'LIST' }],
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
      invalidates: (_, { id }) => [{ type: 'Routines', id }],
    }),
    destroyRoutine: build.mutation({
      query: (id) => ({
        url: `routines/${id}`,
        method: 'DELETE',
      }),
      invalidates: (_, id) => [{ type: 'Routines', id }],
    }),
  }),
})

export const {
  useCreateRoutineMutation,
  useDestroyRoutineMutation,
  useGetRoutinesQuery,
  useUpdateRoutineMutation,
} = routineApi
