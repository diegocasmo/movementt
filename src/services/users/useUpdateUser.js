import { useMutation } from 'react-query'

import { makeApiService } from '_api/client'

const updateUser = makeApiService({
  path: 'users/[id]',
  method: 'PUT',
})

export const useUpdateUser = (options = {}) => useMutation(updateUser, options)
