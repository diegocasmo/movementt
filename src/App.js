import React, { useEffect } from 'react'
import AppLoading from 'expo-app-loading'
import firebase from 'firebase'

import { useAssets } from '_hooks/use-assets'
import { useAuth } from '_context/AuthContext'

import AuthenticatedAppNavigator from '_navigation/AuthenticatedAppNavigator'
import GuestAppNavigator from '_navigation/GuestAppNavigator'

const App = () => {
  const { user, setIsLoading, isLoading, signIn, signOut } = useAuth()
  const { isLoading: isLoadingAssets } = useAssets()

  // Listen to Firebase authentication state changes
  useEffect(() => {
    const unsubscribe = firebase
      .auth()
      .onAuthStateChanged(async (firebaseUser) => {
        if (firebaseUser) {
          await signIn.mutateAsync({ bodyParams: { apiOnly: true } })
        } else {
          await signOut.mutateAsync()
        }

        setIsLoading(false)
      })

    return () => {
      unsubscribe()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (isLoading || isLoadingAssets) {
    return <AppLoading />
  }

  if (user) return <AuthenticatedAppNavigator />

  // User is not logged in
  return <GuestAppNavigator />
}

export default App
