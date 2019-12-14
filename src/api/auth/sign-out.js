import firebase from 'firebase'

export const signOut = async () => {
  return firebase.auth().signOut()
}
