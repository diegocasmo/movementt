import React from 'react'
import AppLoading from 'expo-app-loading'

import { useAssets } from '_hooks/use-assets'
import { useUser } from '_hooks/use-user'
import { User } from '_api'

import UnverifiedAppNavigator from '_navigation/UnverifiedAppNavigator'
import VerifiedAppNavigator from '_navigation/VerifiedAppNavigator'
import GuestAppNavigator from '_navigation/GuestAppNavigator'

const App = () => {
  const { loading: loadingAssets } = useAssets()
  const { user, isLoadingAuth } = useUser()

  if (isLoadingAuth || loadingAssets) {
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
