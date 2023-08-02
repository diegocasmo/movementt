import { getAuth, updatePassword } from 'firebase/auth'
import { useMutation } from 'react-query'

export const useUpdatePassword = (options = {}) =>
  useMutation(async ({ bodyParams } = {}) => {
    const { password = '' } = bodyParams
    return updatePassword(getAuth().currentUser, password)
  }, options)
