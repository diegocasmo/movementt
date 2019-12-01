import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'

import AppNavigator from './navigation/AppNavigator'
import { initializeApi } from './api/config'

initializeApi()

const App = () => {
  return (
    <View style={styles.container}>
      <AppNavigator />
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
