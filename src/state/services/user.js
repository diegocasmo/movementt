import { createApi } from '@rtk-incubator/rtk-query/react'
import { baseQueryWithRetry } from '_state/services/utils/baseQuery'

const userType = 'Users'
export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithRetry,
  tagTypes: [userType],
  endpoints: (build) => ({
    getCurrentUser: build.query({
      query: () => ({
        url: 'users/me',
        method: 'GET',
      }),
      providesTags: (_, __, id) => [{ type: userType, id }],
    }),
    updateUser: build.mutation({
      query: ({ id, ...body }) => ({
        url: `users/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (_, __, { id }) => [{ type: userType, id }],
    }),
  }),
})

export const {
  useGetCurrentUserQuery,
  endpoints,
  util,
  useSignUserOutMutation,
  useUpdateUserMutation,
} = userApi
