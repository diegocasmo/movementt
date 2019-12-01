import React, { useEffect } from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
// TODO: Handle this through redux?
import { onAuthStateChanged } from '../api/resources/user'

const AuthLoadingScreen = ({ navigation }) => {
  const handleAuthStateChanged = user => {
    if (user) {
      navigation.navigate('AuthenticatedApp')
    } else {
      navigation.navigate('GuestApp')
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(handleAuthStateChanged)
    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  )
}

export default AuthLoadingScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
