import * as Yup from 'yup'
import firebase from 'firebase'
import axios from 'axios'
import { transformYupToFormikError } from '_api/utils'

export default class User {
  static URL = 'users'

  static SCHEMA = Yup.object().shape({
    id: Yup.number(),
    uid: Yup.string().required(),
    email: Yup.string().trim().required(),
    verified: Yup.bool().required(),
    created_at: Yup.string(),
    updated_at: Yup.string(),
  })

  static _firebaseUser = () => {
    return firebase.auth().currentUser
  }

  static onAuthStateChanged = (args) => {
    return firebase.auth().onAuthStateChanged(args)
  }

  static sendPasswordResetEmail = async (email) => {
    return firebase.auth().sendPasswordResetEmail(email)
  }

  static reauthenticate = async (
    email,
    password,
    user = User._firebaseUser()
  ) => {
    return user.reauthenticateWithCredential(
      firebase.auth.EmailAuthProvider.credential(email, password)
    )
  }

  static signInWithEmailAndPassword = async (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
  }

  static createUserWithEmailAndPassword = async (email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
  }

  static updatePassword = async (password, user = User._firebaseUser()) => {
    return user.updatePassword(password)
  }

  static sendEmailVerification = async (user = User._firebaseUser()) => {
    return user.sendEmailVerification()
  }

  static signOut = async () => {
    return firebase.auth().signOut()
  }

  static validate = async (attrs) => {
    return User.SCHEMA.validate(attrs, {
      stripUnknown: true,
    }).catch((yupError) => Promise.reject(transformYupToFormikError(yupError)))
  }

  static setToken = async (user = User._firebaseUser()) => {
    try {
      const token = await user.getIdToken(true)
      axios.defaults.headers.common['Authorization'] = token
    } catch (err) {
      throw new Error('Unable to set user token')
    }
  }

  static removeToken = () => {
    axios.defaults.headers.common['Authorization'] = ''
  }

  static get = async () => {
    try {
      const response = await axios.get(`${User.URL}/me`)

      return response.data
    } catch (err) {
      throw new Error('Unable to fetch user')
    }
  }

  static update = async (attrs) => {
    try {
      const user = await User.validate(attrs)

      const response = await axios.put(`${User.URL}/${user.id}`, {
        user,
      })

      return response.data
    } catch (err) {
      throw new Error('Unable to update user')
    }
  }

  static verify = async (user) => {
    try {
      await User._firebaseUser().reload()

      const firebaseUser = User._firebaseUser()
      if (!user.verified && firebaseUser.emailVerified) {
        user = await User.update({ ...user, verified: true })
      }

      return user
    } catch (err) {
      throw new Error('Unable to verify user')
    }
  }
}
