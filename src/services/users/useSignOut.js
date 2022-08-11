import firebase from 'firebase'
import { useMutation } from 'react-query'

export const useSignOut = (options = {}) =>
  useMutation(async () => {
    return firebase.auth().signOut()
  }, options)
