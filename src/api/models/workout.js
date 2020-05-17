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

export const validate = async (attrs) => {
  return SCHEMA.validate(attrs).catch((yupError) =>
    Promise.reject(transformYupToFormikError(yupError))
  )
}

const getUserNode = (uid) => `workouts/${uid}`

export const fetch = async (uid) => {
  return db
    .ref(getUserNode(uid))
    .once('value')
    .then((snapshot) => snapshot.val() || [])
    .catch(() => Promise.reject(new Error('Unable to fetch workouts')))
}

export const create = async (uid, attrs) => {
  const workoutAttrs = { createdAt: timestamp(), ...attrs }
  return validate(workoutAttrs)
    .then(() => db.ref(getUserNode(uid)).push(workoutAttrs))
    .then((ref) => ({ key: ref.key, attrs: workoutAttrs }))
    .catch(() => Promise.reject(new Error('Unable to create workout')))
}
