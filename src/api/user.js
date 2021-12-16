import * as Yup from 'yup'
import firebase from 'firebase'
import axios from 'axios'
import { transformYupToFormikError } from '_api/utils/yup'
import { getUrl } from '_api/utils/url'
import { buildSelectOptions } from '_utils/select-options'

export const URL = `${getUrl()}/users`

export const SYSTEM_OF_MEASUREMENT_METRIC = 'metric'
export const SYSTEM_OF_MEASUREMENT_IMPERIAL = 'imperial'

export const SYSTEMS_OF_MEASUREMENT = [
  SYSTEM_OF_MEASUREMENT_METRIC,
  SYSTEM_OF_MEASUREMENT_IMPERIAL,
]

export const WEIGHT_UNIT_TYPE_LABELS = {
  [SYSTEM_OF_MEASUREMENT_METRIC]: 'Kg',
  [SYSTEM_OF_MEASUREMENT_IMPERIAL]: 'lb',
}

export const DISTANCE_UNIT_TYPE_LABELS = {
  [SYSTEM_OF_MEASUREMENT_METRIC]: 'Km',
  [SYSTEM_OF_MEASUREMENT_IMPERIAL]: 'mi',
}

export const WEIGHT_UNIT_TYPE_OPTS = buildSelectOptions(WEIGHT_UNIT_TYPE_LABELS)
export const DISTANCE_UNIT_TYPE_OPTS = buildSelectOptions(
  DISTANCE_UNIT_TYPE_LABELS
)

export const SCHEMA = Yup.object().shape({
  id: Yup.number(),
  uid: Yup.string().required(),
  email: Yup.string().trim().required(),
  verified: Yup.bool().required(),
  weight_unit_type: Yup.mixed().oneOf(SYSTEMS_OF_MEASUREMENT),
  distance_unit_type: Yup.mixed().oneOf(SYSTEMS_OF_MEASUREMENT),
  created_at: Yup.string(),
  updated_at: Yup.string(),
})

export const _firebaseUser = () => {
  return firebase.auth().currentUser
}

export const onAuthStateChanged = (args) => {
  return firebase.auth().onAuthStateChanged(args)
}

export const signUp = async ({ email = '', password = '' }) => {
  // Notice Firebase automatically signs user in when their account is created
  await firebase.auth().createUserWithEmailAndPassword(email, password)
  sendVerification()
}

export const signIn = async ({
  email = '',
  password = '',
  apiOnly = false,
}) => {
  if (!apiOnly) {
    await firebase.auth().signInWithEmailAndPassword(email, password)
  }

  try {
    const response = await axios.get(`${URL}/me`)

    return response.data
  } catch (err) {
    throw new Error('Unable to sign in user')
  }
}

export const signOut = async () => {
  return firebase.auth().signOut()
}

export const sendPasswordReset = async (email) => {
  return firebase.auth().sendPasswordResetEmail(email)
}

export const reauthenticate = async (
  { email = '', password = '' },
  user = _firebaseUser()
) => {
  return user.reauthenticateWithCredential(
    firebase.auth.EmailAuthProvider.credential(email, password)
  )
}
export const updatePassword = async (password, user = _firebaseUser()) => {
  return user.updatePassword(password)
}

export const sendVerification = (user = _firebaseUser()) =>
  user.sendEmailVerification()

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

export const verify = async () => {
  try {
    // Must update user token
    await _firebaseUser().getIdToken(true)

    const response = await axios.put(`${URL}/verify`)

    return response.data
  } catch (err) {
    throw new Error('Unable to verify user')
  }
}

export const verified = (user) => user && user.verified

export const getWeightUnitTypeLabel = (user) =>
  WEIGHT_UNIT_TYPE_LABELS[user.weight_unit_type]

export const getDistanceUnitTypeLabel = (user) =>
  DISTANCE_UNIT_TYPE_LABELS[user.distance_unit_type]
