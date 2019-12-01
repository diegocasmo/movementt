import firebase from 'firebase'
import * as Google from 'expo-google-app-auth'
import { getGoogleConfig } from '../config'

export function onAuthStateChanged(args) {
  return firebase.auth().onAuthStateChanged(args)
}

// https://docs.expo.io/versions/latest/sdk/google/
export async function signInWithGoogleAsync() {
  const result = await Google.logInAsync({
    iosClientId: getGoogleConfig().iosClientId,
    scopes: ['profile', 'email'],
  })

  if (result.type === 'success') {
    return result
  } else {
    throw new Error('Canceled')
  }
}

// https://firebase.google.com/docs/auth/web/google-signin#advanced:-handle-the-sign-in-flow-manually
function isGoogleUserEqual(googleUser, firebaseUser) {
  if (firebaseUser) {
    const providerData = firebaseUser.providerData
    for (let i = 0; i < providerData.length; i++) {
      if (
        providerData[i].providerId ===
          firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
        providerData[i].uid === googleUser.getBasicProfile().getId()
      ) {
        // We don't need to re-auth the Firebase connection
        return true
      }
    }
  }
  return false
}

// https://firebase.google.com/docs/auth/web/google-signin#advanced:-handle-the-sign-in-flow-manually
export async function onGoogleSignIn(googleUser) {
  // Register an Observer on Firebase Auth to make sure auth is initialized
  let unsubscribe = firebase.auth().onAuthStateChanged(firebaseUser => {
    unsubscribe()
    // Check if we are already signed-in Firebase with the correct user
    if (isGoogleUserEqual(googleUser, firebaseUser)) {
      return
    }

    // Build Firebase credential with the Google ID token
    const credential = firebase.auth.GoogleAuthProvider.credential(
      googleUser.idToken,
      googleUser.accessToken
    )

    // Sign in with credential from the Google user
    return firebase.auth().signInWithCredential(credential)
  })
}
