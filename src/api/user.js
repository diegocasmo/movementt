import firebase from 'firebase'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

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

export default class User {
  static URL = 'users'

  static TOKEN_KEY = 'movementt-user-token'

  static getToken = async () => {
    try {
      return AsyncStorage.getItem(User.TOKEN_KEY)
    } catch (err) {
      throw new Error('Unable to retrieve user token')
    }
  }

  static setToken = async () => {
    try {
      const token = await firebase.auth().currentUser.getIdToken(true)
      await AsyncStorage.setItem(User.TOKEN_KEY, token)
    } catch (err) {
      throw new Error('Unable to set user token')
    }
  }

  static removeToken = async () => {
    try {
      await AsyncStorage.removeItem(User.TOKEN_KEY)
    } catch (err) {
      throw new Error('Unable to remove user token')
    }
  }

  static getMe = async () => {
    try {
      const response = await axios.get(`${User.URL}/me`)

      return response.data
    } catch (err) {
      throw new Error('Unable to fetch user')
    }
  }

  static reload = async () => {
    await currentUser().reload()
    return currentUser()
  }
}
