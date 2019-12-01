import firebase from 'firebase'

export const onAuthStateChanged = args => {
  return firebase.auth().onAuthStateChanged(args)
}
