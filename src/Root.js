import React from 'react'
import App from './App'
import { initializeApi } from './api/config'
import { Provider } from 'react-redux'
import store from './state'
import { Root as NativeBaseRoot } from 'native-base'
import { NavigationContainer } from '@react-navigation/native'

initializeApi()

const Root = () => {
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
