import * as Yup from 'yup'
import { db } from '../config'
import { transformYupToFormikError } from '../utils'
import { EMPTY_EXERCISE, SCHEMA as EXERCISE_SCHEMA } from './exercise'

export const EMPTY_WORKOUT = {
  name: '',
  rounds: 4,
  restSeconds: 30,
  exercises: [EMPTY_EXERCISE],
}

export const SCHEMA = Yup.object({
  name: Yup.string().trim().required(),
  rounds: Yup.number().required().positive().min(1),
  restSeconds: Yup.number().required().positive().min(0),
  exercises: Yup.array()
    .of(Yup.mixed().concat(EXERCISE_SCHEMA))
    .min(1)
    .required(),
})

export const validate = async (attrs) => {
  return SCHEMA.validate(attrs).catch((yupError) =>
    Promise.reject(transformYupToFormikError(yupError))
  )
}

const getUserNode = (uid) => `workouts/${uid}`

export const create = async (uid, attrs) => {
  return validate(attrs)
    .then(() => db.ref(getUserNode(uid)).push(attrs))
    .catch(() => Promise.reject(new Error('Unable to create workout')))
}

export const fetch = async (uid) => {
  return db
    .ref(getUserNode(uid))
    .once('value')
    .then((snapshot) => snapshot.val() || [])
    .catch(() => Promise.reject(new Error('Unable to fetch workouts')))
}
