import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppLoading } from 'expo'
import * as Font from 'expo-font'
import { Ionicons } from '@expo/vector-icons'

import { onAuthStateChanged } from './api/auth/on-auth-state-changed'
import { handleAuthStateChanged } from './state/reducers/auth'

import AuthenticatedAppNavigator from './navigation/AuthenticatedAppNavigator'
import GuestAppNavigator from './navigation/GuestAppNavigator'

const App = props => {
  const dispatch = useDispatch()
  const { isLoadingAuth, uid } = useSelector(({ auth }) => ({
    isLoadingAuth: auth.isLoadingAuth,
    uid: auth.uid,
  }))
  const [isLoadingFonts, setIsLoadingFonts] = useState(true)

  // Load application assets
  useEffect(() => {
    async function loadAssets() {
      await Font.loadAsync({
        Roboto: require('../node_modules/native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('../node_modules/native-base/Fonts/Roboto_medium.ttf'),
        ...Ionicons.font,
      })

      setIsLoadingFonts(false)
    }

    loadAssets()
  }, [])

  // Listen to authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(user => {
      dispatch(handleAuthStateChanged(user))
    })

    return () => {
      unsubscribe()
    }
  }, [dispatch])

  if (isLoadingAuth || isLoadingFonts) {
    return <AppLoading />
  }

  return uid ? <AuthenticatedAppNavigator /> : <GuestAppNavigator />
}

export default App
