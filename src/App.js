import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AppLoading from 'expo-app-loading'

import { useAssets } from '_hooks/use-assets'
import {
  authStateChanged,
  getUser,
  isLoadingAuth,
  signIn,
  signOut,
} from '_state/reducers/auth'
import { User } from '_models'

import AuthenticatedAppNavigator from '_navigation/AuthenticatedAppNavigator'
import GuestAppNavigator from '_navigation/GuestAppNavigator'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(getUser)
  const loadingAuth = useSelector(isLoadingAuth)
  const { loading: loadingAssets } = useAssets()

  // Listen to Firebase authentication state changes
  useEffect(() => {
    const unsubscribe = User.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        await dispatch(signIn({ apiOnly: true }))
      } else {
        await dispatch(signOut())
      }

      dispatch(authStateChanged())
    })

    return () => {
      unsubscribe()
    }
  }, [])

  if (loadingAuth || loadingAssets) {
    return <AppLoading />
  }

  if (user) return <AuthenticatedAppNavigator />

  // User is not logged in
  return <GuestAppNavigator />
}

export default App
