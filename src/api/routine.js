import * as Yup from 'yup'
import { db } from '_api/config'
import { transformYupToFormikError } from '_api/utils'
import { timestamp } from '_utils/time-utils'
import { ROUTINE_EXERCISE_SCHEMA } from '_api/routine-exercise'

const TYPE_CIRCUIT = 'circuit'

const TYPES = [TYPE_CIRCUIT]

export const DEFAULT_ROUTINE = {
  name: '',
  type: TYPE_CIRCUIT,
  rounds: 4,
  restSeconds: 0,
  exercises: [],
}

export const ROUTINE_SCHEMA = Yup.object({
  type: Yup.mixed().oneOf(TYPES).required(),
  name: Yup.string().trim().required(),
  rounds: Yup.number()
    .transform((v) => (isNaN(v) ? -1 : v))
    .required()
    .positive()
    .min(1),
  restSeconds: Yup.number()
    .transform((v) => (isNaN(v) ? -1 : v))
    .required()
    .positive()
    .min(0),
  createdAt: Yup.number().positive(),
  updatedAt: Yup.number().positive(),
  exercises: Yup.array(Yup.object().concat(ROUTINE_EXERCISE_SCHEMA))
    .min(1)
    .required(),
})

export const validate = async (values) => {
  return ROUTINE_SCHEMA.validate(values, {
    stripUnknown: true,
  }).catch((yupError) => Promise.reject(transformYupToFormikError(yupError)))
}

const getRoutinesRef = (uid) => `routines/${uid}`
const getRoutineRef = (uid, key) => `${getRoutinesRef(uid)}/${key}`

export const fetchRoutines = async (uid) => {
  try {
    const snapshot = await db.ref(getRoutinesRef(uid)).once('value')
    const values = snapshot.val()
    return values
      ? Object.entries(values).map(([key, values]) => ({ key, ...values }))
      : {}
  } catch (err) {
    throw new Error('Unable to fetch routines')
  }
}

export const createRoutine = async (uid, attrs) => {
  let routine = { ...attrs, createdAt: timestamp() }

  try {
    routine = await validate(routine)
    const ref = await db.ref(getRoutinesRef(uid)).push(routine)

    return { ...routine, key: ref.key }
  } catch (err) {
    throw new Error('Unable to create routine')
  }
}

export const updateRoutine = async (uid, attrs) => {
  let routine = { ...attrs, updatedAt: timestamp() }

  try {
    routine = await validate(routine)
    await db.ref(getRoutineRef(uid, attrs.key)).update(routine)

    return { ...routine, key: attrs.key }
  } catch (err) {
    throw new Error('Unable to update routine')
  }
}

export const destroyRoutine = async (uid, routine) => {
  try {
    await db.ref(getRoutineRef(uid, routine.key)).remove()
    return routine
  } catch (err) {
    throw new Error('Unable to destroy routine')
  }
}

export const isRoutineFromSeed = ({ createdAt, updatedAt }) => {
  return createdAt === null && updatedAt === null
}

export const getRoutineFormattedExercises = (routine) => {
  const names = routine.exercises.map((ex) => ex.name)
  if (names.length === 1) return names

  return `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`
}
