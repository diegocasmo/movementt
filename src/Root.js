require('./api') // eslint-disable-line no-undef
import React from 'react'
import App from './App'
import { Provider } from 'react-redux'
import store from '_state'
import { UserProvider } from '_hooks/use-user'
import { Root as NativeBaseRoot } from 'native-base'
import { NavigationContainer } from '@react-navigation/native'
import { Audio } from 'expo-av'

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
      <UserProvider>
        <NavigationContainer>
          <App />
        </NavigationContainer>
      </UserProvider>
    </Provider>
  </NativeBaseRoot>
)

export default Root
