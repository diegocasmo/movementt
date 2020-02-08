import firebase from 'firebase'

export const currentUser = () => {
  return firebase.auth().currentUser
}
