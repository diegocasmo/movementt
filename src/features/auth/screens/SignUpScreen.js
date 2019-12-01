import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const SignUpScreen = () => {
  return (
    <View style={styles.container}>
      <Text>SignUpScreen</Text>
    </View>
  )
}

SignUpScreen.navigationOptions = {
  title: 'Create Account',
}

export default SignUpScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
