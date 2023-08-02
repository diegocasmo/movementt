import { getAuth, signOut } from 'firebase/auth'
import { useMutation } from 'react-query'

export const useSignOut = (options = {}) =>
  useMutation(() => signOut(getAuth()), options)
