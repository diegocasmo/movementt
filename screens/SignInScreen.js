import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
// TODO: Handle this through redux
import { signInWithGoogleAsync, onGoogleSignIn } from '../api/resources/user'

const SignInScreen = () => {
  return (
    <View style={styles.container}>
      <Button
        title="Sign In With Google"
        onPress={() => {
          signInWithGoogleAsync()
            .then(googleUser => onGoogleSignIn(googleUser))
            .then(() => console.log('Signed in!'))
            .catch(err => {
              console.log('Error on sign in: ', err)
            })
        }}
      />
    </View>
  )
}

export default SignInScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
