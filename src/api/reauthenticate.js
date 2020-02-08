import firebase from 'firebase'

export const reauthenticate = async (user, email, password) => {
  return user.reauthenticateWithCredential(
    firebase.auth.EmailAuthProvider.credential(email, password)
  )
}
