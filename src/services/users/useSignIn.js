import firebase from 'firebase'
import { useMutation } from 'react-query'

import { makeApiService } from '_api/client'

const signIn = makeApiService({
  path: 'users',
  method: 'POST',
})

export const useSignIn = (options = {}) =>
  useMutation(async ({ bodyParams } = {}) => {
    const { email = '', password = '', apiOnly = false } = bodyParams

    if (!apiOnly) {
      await firebase.auth().signInWithEmailAndPassword(email, password)
    }

    return signIn()
  }, options)
