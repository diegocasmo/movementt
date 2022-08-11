import firebase from 'firebase'
import { useMutation } from 'react-query'

export const useSendPasswordReset = (options = {}) =>
  useMutation(({ bodyParams } = {}) => {
    const { email = '' } = bodyParams

    return firebase.auth().sendPasswordResetEmail(email)
  }, options)
