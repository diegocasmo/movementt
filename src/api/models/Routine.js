import * as Yup from 'yup'
import { db } from '_api/config'
import { transformYupToFormikError } from '_api/utils'
import Exercise from './Exercise'
import { timestamp } from '_utils/time-utils'

export default class Routine {
  static TYPE_CIRCUIT = 'circuit'

  static TYPES = [Routine.TYPE_CIRCUIT]

  static EMPTY = {
    name: '',
    type: Routine.TYPE_CIRCUIT,
    rounds: 4,
    restSeconds: 0,
    exercises: [],
  }

  static getSchema = () => {
    return Yup.object({
      key: Yup.string(),
      type: Yup.mixed().oneOf(Routine.TYPES).required(),
      name: Yup.string().trim().required(),
      rounds: Yup.number().required().positive().min(1),
      restSeconds: Yup.number().required().positive().min(0),
      createdAt: Yup.number().positive(),
      updatedAt: Yup.number().positive(),
      exercises: Yup.array().min(1).required(),
    })
  }

  static validate = async (values) => {
    return Routine.getSchema()
      .validate(values, { stripUnknown: true })
      .catch((yupError) => Promise.reject(transformYupToFormikError(yupError)))
  }

  static getRoutinesRef = (uid) => `routines/${uid}`
  static getRoutineRef = (uid, key) => `${Routine.getRoutinesRef(uid)}/${key}`

  static fetch = async (uid) => {
    try {
      const snapshot = await db.ref(Routine.getRoutinesRef(uid)).once('value')
      const values = snapshot.val()
      return values
        ? Object.entries(values).map(([key, values]) => ({ key, ...values }))
        : {}
    } catch (err) {
      throw new Error('Unable to fetch routines')
    }
  }

  static create = async (uid, attrs) => {
    let routine = { ...attrs, createdAt: timestamp() }

    try {
      routine = await Routine.validate(routine)
      const ref = await db.ref(Routine.getRoutinesRef(uid)).push(routine)

      return { ...routine, key: ref.key }
    } catch (err) {
      throw new Error('Unable to create routine')
    }
  }

  static update = async (uid, attrs) => {
    let routine = { ...attrs, updatedAt: timestamp() }

    try {
      routine = await Routine.validate(routine)
      await db.ref(Routine.getRoutineRef(uid, attrs.key)).update(routine)

      return { ...routine, key: attrs.key }
    } catch (err) {
      throw new Error('Unable to update routine')
    }
  }

  static destroy = async (uid, routine) => {
    try {
      await db.ref(Routine.getRoutineRef(uid, routine.key)).remove()
      return routine
    } catch (err) {
      throw new Error('Unable to destroy routine')
    }
  }

  static isFromSeed = ({ createdAt, updatedAt }) => {
    return createdAt === null && updatedAt === null
  }

  static formattedExercises = (routine) => {
    const names = routine.exercises.map((ex) => ex.name)
    if (names.length === 1) return names

    return `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`
  }
}
