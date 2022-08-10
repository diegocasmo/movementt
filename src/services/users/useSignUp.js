import firebase from 'firebase'
import { useMutation } from 'react-query'

export const useSignUp = (options = {}) =>
  useMutation(({ bodyParams }) => {
    const { email = '', password = '' } = bodyParams
    return firebase.auth().createUserWithEmailAndPassword(email, password) // Notice Firebase automatically signs user in when their account is created
  }, options)
