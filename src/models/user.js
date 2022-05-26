import * as Yup from 'yup'
import firebase from 'firebase'
import axios from 'axios'
import { transformYupToFormikError } from '_models/utils/yup'
import { getUrl } from '_models/utils/url'
import { UNITS_OF_MEASUREMENT } from '_utils/units'

export const URL = `${getUrl()}/users`

export const SCHEMA = Yup.object().shape({
  id: Yup.number(),
  uid: Yup.string().required(),
  email: Yup.string().trim().required(),
  weight_unit_type: Yup.mixed().oneOf(UNITS_OF_MEASUREMENT).required(),
  distance_unit_type: Yup.mixed().oneOf(UNITS_OF_MEASUREMENT).required(),
  created_at: Yup.string(),
  updated_at: Yup.string(),
})

export const _firebaseUser = () => firebase.auth().currentUser

export const onAuthStateChanged = (args) =>
  firebase.auth().onAuthStateChanged(args)

// Notice Firebase automatically signs user in when their account is created
export const signUp = async ({ email = '', password = '' }) =>
  firebase.auth().createUserWithEmailAndPassword(email, password)

export const signIn = async ({
  email = '',
  password = '',
  apiOnly = false,
}) => {
  if (!apiOnly) {
    await firebase.auth().signInWithEmailAndPassword(email, password)
  }

  try {
    const response = await axios.post(URL)

    return response.data
  } catch (err) {
    throw new Error('Unable to sign in user')
  }
}

export const signOut = async () => firebase.auth().signOut()

export const sendPasswordReset = async (email) =>
  firebase.auth().sendPasswordResetEmail(email)

export const reauthenticate = async (
  { email = '', password = '' },
  user = _firebaseUser()
) => {
  return user.reauthenticateWithCredential(
    firebase.auth.EmailAuthProvider.credential(email, password)
  )
}
export const updatePassword = async (password, user = _firebaseUser()) =>
  user.updatePassword(password)

export const validate = async (attrs) => {
  return SCHEMA.validate(attrs, {
    stripUnknown: true,
  }).catch((yupError) => Promise.reject(transformYupToFormikError(yupError)))
}

export const update = async (attrs) => {
  try {
    const user = await validate(attrs)

    const response = await axios.put(`${URL}/${user.id}`, {
      user,
    })

    return response.data
  } catch (err) {
    throw new Error('Unable to update user')
  }
}
