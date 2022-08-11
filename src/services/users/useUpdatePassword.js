import firebase from 'firebase'
import { useMutation } from 'react-query'

export const useUpdatePassword = (options = {}) =>
  useMutation(async ({ bodyParams } = {}) => {
    const { password = '' } = bodyParams
    return firebase.auth().currentUser.updatePassword(password)
  }, options)
