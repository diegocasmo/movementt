import './api'
import React from 'react'
import App from './App'
import { Provider } from 'react-redux'
import store from '_state'
import { Root as NativeBaseRoot } from 'native-base'
import { NavigationContainer } from '@react-navigation/native'
import { Audio } from 'expo-av'
import { QueryClientProvider } from 'react-query'
import { queryClient } from '_services/config/queryClient'
import { AuthProvider } from '_context/AuthContext'

Audio.setAudioModeAsync({
  playsInSilentModeIOS: true,
  staysActiveInBackground: true,
  interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS,
  shouldDuckAndroid: true,
  allowsRecordingIOS: false,
  interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
  playThroughEarpieceAndroid: false,
})

const Root = () => (
  <NativeBaseRoot>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <NavigationContainer>
            <App />
          </NavigationContainer>
        </AuthProvider>
      </QueryClientProvider>
    </Provider>
  </NativeBaseRoot>
)

export default Root
