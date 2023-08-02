import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
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
      await signInWithEmailAndPassword(getAuth(), email, password)
    }

    return signIn()
  }, options)
