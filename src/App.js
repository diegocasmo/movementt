import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AppLoading from 'expo-app-loading'
import * as Font from 'expo-font'
import { Ionicons } from '@expo/vector-icons'

import User from '_api/user'
import {
  handleAuthStateChanged,
  getUser,
  isLoadingAuth,
} from '_state/reducers/auth'

import UnverifiedAppNavigator from '_navigation/UnverifiedAppNavigator'
import VerifiedAppNavigator from '_navigation/VerifiedAppNavigator'
import GuestAppNavigator from '_navigation/GuestAppNavigator'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => getUser(state))
  const loadingAuth = useSelector((state) => isLoadingAuth(state))
  const [loadingFonts, setLoadingFonts] = useState(true)

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

      setLoadingFonts(false)
    }

    loadAssets()
  }, [])

  // Listen to authentication state changes
  useEffect(() => {
    const unsubscribe = User.onAuthStateChanged((firebaseUser) => {
      dispatch(handleAuthStateChanged(!!firebaseUser))
    })

    return () => {
      unsubscribe()
    }
  }, [dispatch])

  if (loadingAuth || loadingFonts) {
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
