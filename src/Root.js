import React from 'react'
import App from './App'
import { initializeApi } from './api/config'
import { Provider } from 'react-redux'
import store from './state'
import { Root as NativeBaseRoot } from 'native-base'

initializeApi()

const Root = () => {
  return (
    <NativeBaseRoot>
      <Provider store={store}>
        <App />
      </Provider>
    </NativeBaseRoot>
  )
}

export default Root
