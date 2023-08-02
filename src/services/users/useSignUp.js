import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useMutation } from 'react-query'

export const useSignUp = (options = {}) =>
  useMutation(({ bodyParams }) => {
    const { email = '', password = '' } = bodyParams
    return createUserWithEmailAndPassword(getAuth(), email, password) // Notice Firebase automatically signs user in when their account is created
  }, options)
