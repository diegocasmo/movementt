require('./api/config') // eslint-disable-line no-undef
import React, { useEffect } from 'react'
import App from './App'
import { Provider } from 'react-redux'
import store from '_state'
import { Root as NativeBaseRoot } from 'native-base'
import { NavigationContainer } from '@react-navigation/native'
import { Audio } from 'expo-av'
import { initializeApi } from '_api'

Audio.setAudioModeAsync({
  playsInSilentModeIOS: true,
  staysActiveInBackground: true,
  interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS,
  shouldDuckAndroid: true,
  allowsRecordingIOS: false,
  interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
  playThroughEarpieceAndroid: false,
})

const Root = () => {
  const configureApi = async () => {
    await initializeApi()
  }

  useEffect(() => {
    configureApi()
  }, [])

  return (
    <NativeBaseRoot>
      <Provider store={store}>
        <NavigationContainer>
          <App />
        </NavigationContainer>
      </Provider>
    </NativeBaseRoot>
  )
}

export default Root
