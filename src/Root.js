import React from 'react'
import App from './App'
import { initializeApi } from './api/config'
import { Provider } from 'react-redux'
import store from './state'

initializeApi()

const Root = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

export default Root
