import { getAuth } from 'firebase/auth'
import { useMutation } from 'react-query'

export const useSendPasswordReset = (options = {}) =>
  useMutation(({ bodyParams } = {}) => {
    const { email = '' } = bodyParams

    return getAuth().sendPasswordResetEmail(email)
  }, options)
