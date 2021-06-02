import { useGetCurrentUserQuery } from '_state/services/user'

export const useCurrentUser = () => {
  const { user, refetch } = useGetCurrentUserQuery(undefined, {
    selectFromResult: ({ data }) => ({
      user: data,
    }),
  })

  return { user, refetch }
}
