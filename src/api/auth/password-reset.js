import firebase from 'firebase'

export const sendPasswordResetEmail = async email => {
  return firebase.auth().sendPasswordResetEmail(email)
}
