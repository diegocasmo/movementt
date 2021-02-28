import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AppLoading from 'expo-app-loading'
import * as Font from 'expo-font'
import { Ionicons } from '@expo/vector-icons'
import { showError } from '_utils/toast'

import User from '_api/user'
import { handleAuthStateChanged } from '_state/reducers/auth'

import UnverifiedAppNavigator from '_navigation/UnverifiedAppNavigator'
import VerifiedAppNavigator from '_navigation/VerifiedAppNavigator'
import GuestAppNavigator from '_navigation/GuestAppNavigator'

const App = () => {
  const dispatch = useDispatch()
  const { isLoadingAuth, user } = useSelector(({ auth }) => ({
    isLoadingAuth: auth.isLoadingAuth,
    user: auth.user,
  }))
  const [isLoadingFonts, setIsLoadingFonts] = useState(true)

  // Load application assets
  useEffect(() => {
    const loadAssets = async () => {
      await Font.loadAsync({
        // eslint-disable-next-line no-undef
        Roboto: require('../node_modules/native-base/Fonts/Roboto.ttf'),
        // eslint-disable-next-line no-undef
        Roboto_medium: require('../node_modules/native-base/Fonts/Roboto_medium.ttf'),
        ...Ionicons.font,
      })

      setIsLoadingFonts(false)
    }

    loadAssets()
  }, [])

  // Listen to authentication state changes
  useEffect(() => {
    const unsubscribe = User.onAuthStateChanged(async (firebaseUser) => {
      try {
        await dispatch(handleAuthStateChanged(!!firebaseUser))
      } catch (err) {
        showError('There was an issue while authenticating the user')
      }
    })

    return () => {
      unsubscribe()
    }
  }, [dispatch])

  if (isLoadingAuth || isLoadingFonts) {
    return <AppLoading />
  }

  // User is logged in and their email has been verified
  if (user && user.verified) return <VerifiedAppNavigator />

  // User is logged in, but their email hasn't been verified
  if (user) return <UnverifiedAppNavigator />

  // User is not logged in
  return <GuestAppNavigator />
}

export default App
