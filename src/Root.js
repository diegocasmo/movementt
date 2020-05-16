require('./api/config') // eslint-disable-line no-undef
import React from 'react'
import App from './App'
import { Provider } from 'react-redux'
import store from './state'
import { Root as NativeBaseRoot } from 'native-base'
import { NavigationContainer } from '@react-navigation/native'

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
