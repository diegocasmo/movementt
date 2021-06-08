import { useState, useEffect } from 'react'
import { User } from '_api'
import { useUser } from '_hooks/use-user'

export const useAuthState = () => {
  const [loadingAuth, setLoadingAuth] = useState(true)
  const { user, isLoading, fetch: fetchUser, clear: clearUser } = useUser()

  // Listen to Firebase authentication state changes
  useEffect(() => {
    const unsubscribe = User.onAuthStateChanged(async (firebaseUser) => {
      setLoadingAuth(false)

      if (firebaseUser) {
        fetchUser()
      } else {
        User.signOut()
        clearUser()
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
