import * as Yup from 'yup'
import { db } from '../config'
import { transformYupToFormikError } from '../utils'
import Exercise from './Exercise'
import { timestamp } from '../../utils/time-utils'

export default class Workout {
  static EMPTY = {
    name: '',
    rounds: 4,
    restSeconds: 30,
    exercises: [],
  }

  static getSchema = () => {
    return Yup.object({
      key: Yup.string(),
      name: Yup.string().trim().required(),
      rounds: Yup.number().required().positive().min(1),
      restSeconds: Yup.number().required().positive().min(0),
      createdAt: Yup.number().positive(),
      updatedAt: Yup.number().positive(),
      exercises: Yup.array()
        .of(Yup.mixed().concat(Exercise.getSchema()))
        .min(1)
        .required(),
    })
  }

  static validate = async (values) => {
    return Workout.getSchema()
      .validate(values)
      .catch((yupError) => Promise.reject(transformYupToFormikError(yupError)))
  }

  static getWorkoutsRef = (uid) => `workouts/${uid}`
  static getWorkoutRef = (uid, key) => `${Workout.getWorkoutsRef(uid)}/${key}`

  static fetch = async (uid) => {
    return db
      .ref(Workout.getWorkoutsRef(uid))
      .once('value')
      .then((snapshot) => snapshot.val() || [])
      .catch(() => Promise.reject(new Error('Unable to fetch workouts')))
  }

  static create = async (uid, workout) => {
    const attrs = { createdAt: timestamp(), ...workout }
    return Workout.validate(attrs)
      .then(() => db.ref(Workout.getWorkoutsRef(uid)).push(attrs))
      .then((ref) => ({ key: ref.key, ...attrs }))
      .catch(() => Promise.reject(new Error('Unable to create workout')))
  }

  static update = async (uid, workout) => {
    const attrs = { updatedAt: timestamp(), ...workout }
    return Workout.validate(attrs)
      .then(() => db.ref(Workout.getWorkoutRef(uid, workout.key)).update(attrs))
      .then(() => attrs)
      .catch((err) => Promise.reject(new Error('Unable to update workout')))
  }

  static destroy = async (uid, workout) => {
    return db
      .ref(Workout.getWorkoutRef(uid, workout.key))
      .remove()
      .then(() => workout)
      .catch(() => Promise.reject(new Error('Unable to delete workout')))
  }

  static isFromSeed = ({ createdAt, updatedAt }) => {
    return createdAt === null && updatedAt === null
  }
}
