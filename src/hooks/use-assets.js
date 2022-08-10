import { useState, useEffect } from 'react'
import * as Font from 'expo-font'
import { Ionicons } from '@expo/vector-icons'

export const useAssets = () => {
  const [isLoading, setIsLoading] = useState(true)

  // Load application assets
  useEffect(() => {
    const loadAssets = async () => {
      await Font.loadAsync({
        // eslint-disable-next-line no-undef
        Roboto: require('../../node_modules/native-base/Fonts/Roboto.ttf'),
        // eslint-disable-next-line no-undef
        Roboto_medium: require('../../node_modules/native-base/Fonts/Roboto_medium.ttf'),
        ...Ionicons.font,
      })

      setIsLoading(false)
    }

    loadAssets()
  }, [])

  return { isLoading }
}
