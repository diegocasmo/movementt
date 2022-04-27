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

import UnverifiedAppNavigator from '_navigation/UnverifiedAppNavigator'
import VerifiedAppNavigator from '_navigation/VerifiedAppNavigator'
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

  // User is logged in and their email has been verified
  if (User.verified(user)) return <VerifiedAppNavigator />

  // User is logged in, but their email hasn't been verified
  if (user) return <UnverifiedAppNavigator />

  // User is not logged in
  return <GuestAppNavigator />
}

export default App
