import firebase from 'firebase'
import { useMutation } from 'react-query'

export const useSignUp = (options = {}) =>
  useMutation(
    ({ email = '', password = '' }) =>
      firebase.auth().createUserWithEmailAndPassword(email, password), // Notice Firebase automatically signs user in when their account is created
    options
  )
