import firebase from 'firebase'
import { useMutation } from 'react-query'

export const useReauthenticate = (options = {}) =>
  useMutation(({ bodyParams } = {}) => {
    const { email = '', password = '' } = bodyParams

    return firebase
      .auth()
      .currentUser.reauthenticateWithCredential(
        firebase.auth.EmailAuthProvider.credential(email, password)
      )
  }, options)
