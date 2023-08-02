import {
  getAuth,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from 'firebase/auth'
import { useMutation } from 'react-query'

export const useReauthenticate = (options = {}) =>
  useMutation(({ bodyParams } = {}) => {
    const { email = '', password = '' } = bodyParams
    const credential = EmailAuthProvider.credential(email, password)
    return reauthenticateWithCredential(getAuth().currentUser, credential)
  }, options)
