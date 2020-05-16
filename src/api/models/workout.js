import * as Yup from 'yup'
import { db } from '../config'
import { transformYupToFormikError } from '../utils'
import { EMPTY_EXERCISE, SCHEMA as EXERCISE_SCHEMA } from './exercise'

export const EMPTY_WORKOUT = {
  title: '',
  rounds: 4,
  restSeconds: 30,
  exercises: [EMPTY_EXERCISE],
}

export const SCHEMA = Yup.object({
  title: Yup.string().trim().required(),
  rounds: Yup.number().required().positive().min(1),
  restSeconds: Yup.number().required().positive().min(0),
  exercises: Yup.array()
    .of(Yup.mixed().concat(EXERCISE_SCHEMA))
    .min(1)
    .required(),
})

export const validate = async (attrs) => {
  return SCHEMA.validate(attrs).catch((yupError) => {
    return Promise.reject(transformYupToFormikError(yupError))
  })
}

export const create = async (uid, attrs) => {
  return validate(attrs)
    .then(() => {
      return db.ref(`workouts/${uid}`).push(attrs)
    })
    .catch(() => {
      return Promise.reject(new Error('Unable to create workout'))
    })
}
