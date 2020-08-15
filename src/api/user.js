import firebase from 'firebase'

export const currentUser = () => {
  return firebase.auth().currentUser
}

export const onAuthStateChanged = (args) => {
  return firebase.auth().onAuthStateChanged(args)
}

export const sendPasswordResetEmail = async (email) => {
  return firebase.auth().sendPasswordResetEmail(email)
}

export const reauthenticate = async (user, email, password) => {
  return user.reauthenticateWithCredential(
    firebase.auth.EmailAuthProvider.credential(email, password)
  )
}

export const sendEmailVerification = async (user) => {
  return user.sendEmailVerification()
}

export const signInWithEmailAndPassword = async (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password)
}

export const signOut = async () => {
  return firebase.auth().signOut()
}

export const createUserWithEmailAndPassword = async (email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password)
}

export const updatePassword = async (user, password) => {
  return user.updatePassword(password)
}
