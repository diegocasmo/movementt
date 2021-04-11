import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { User } from '_api'
import { endpoints, util } from '_state/services/user'
import { useCurrentUser } from '_hooks/use-current-user'

export const useAuthState = () => {
  const dispatch = useDispatch()
  const [loadingAuth, setLoadingAuth] = useState(true)
  const { user } = useCurrentUser()
  const [
    fetchCurrentUser,
    { isLoading },
  ] = endpoints.getCurrentUser.useLazyQuery()

  // Listen to Firebase authentication state changes
  useEffect(() => {
    const unsubscribe = User.onAuthStateChanged(async (firebaseUser) => {
      setLoadingAuth(false)

      if (firebaseUser) {
        fetchCurrentUser()
      } else {
        User.signOut()
        dispatch(util.resetApiState())
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return {
    loading: loadingAuth || isLoading,
    user,
  }
}
