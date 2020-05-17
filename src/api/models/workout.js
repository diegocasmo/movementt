import * as Yup from 'yup'
import { db } from '../config'
import { transformYupToFormikError } from '../utils'
import { EMPTY_EXERCISE, SCHEMA as EXERCISE_SCHEMA } from './exercise'
import { timestamp } from '../../utils/time-utils'

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
  createdAt: Yup.number().positive(),
  updatedAt: Yup.number().positive(),
  exercises: Yup.array()
    .of(Yup.mixed().concat(EXERCISE_SCHEMA))
    .min(1)
    .required(),
})

export const validate = async (values) => {
  return SCHEMA.validate(values).catch((yupError) =>
    Promise.reject(transformYupToFormikError(yupError))
  )
}

const getWorkoutsRef = (uid) => `workouts/${uid}`
const getWorkoutRef = (uid, key) => `${getWorkoutsRef(uid)}/${key}`

export const fetch = async (uid) => {
  return db
    .ref(getWorkoutsRef(uid))
    .once('value')
    .then((snapshot) => snapshot.val() || [])
    .catch(() => Promise.reject(new Error('Unable to fetch workouts')))
}

export const create = async (uid, values) => {
  const workoutAttrs = { createdAt: timestamp(), ...values }
  return validate(workoutAttrs)
    .then(() => db.ref(getWorkoutsRef(uid)).push(workoutAttrs))
    .then((ref) => ({ key: ref.key, values: workoutAttrs }))
    .catch(() => Promise.reject(new Error('Unable to create workout')))
}

export const destroy = async (uid, key) => {
  return db
    .ref(getWorkoutRef(uid, key))
    .remove()
    .then(() => key)
    .catch(() => Promise.reject(new Error('Unable to delete workout')))
}

export const isFromSeed = ({ createdAt, updatedAt }) => {
  return createdAt === null && updatedAt === null
}
