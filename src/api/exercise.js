import * as Yup from 'yup'
import { db } from '_api/config'
import { getFormattedDistance } from '_utils/distance-utils'
import { getFormattedDuration } from '_utils/time-utils'
import { timestamp } from '_utils/time-utils'
import { transformYupToFormikError } from '_api/utils'

export const MOVEMENT_TYPE_CORE = 'core'
export const MOVEMENT_TYPE_FULL_BODY = 'full_body'
export const MOVEMENT_TYPE_HINGE = 'hinge'
export const MOVEMENT_TYPE_PULL = 'pull'
export const MOVEMENT_TYPE_PUSH = 'push'
export const MOVEMENT_TYPE_SQUAT = 'squat'
export const MOVEMENT_TYPE_OTHER = 'other'

export const MOVEMENT_TYPES = [
  MOVEMENT_TYPE_CORE,
  MOVEMENT_TYPE_FULL_BODY,
  MOVEMENT_TYPE_HINGE,
  MOVEMENT_TYPE_PULL,
  MOVEMENT_TYPE_PUSH,
  MOVEMENT_TYPE_SQUAT,
  MOVEMENT_TYPE_OTHER,
]

export const MOVEMENT_TYPE_OPTS = [
  { label: 'Core', value: MOVEMENT_TYPE_CORE },
  { label: 'Full body', value: MOVEMENT_TYPE_FULL_BODY },
  { label: 'Hinge', value: MOVEMENT_TYPE_HINGE },
  { label: 'Pull', value: MOVEMENT_TYPE_PULL },
  { label: 'Push', value: MOVEMENT_TYPE_PUSH },
  { label: 'Squat', value: MOVEMENT_TYPE_SQUAT },
  { label: 'Other', value: MOVEMENT_TYPE_OTHER },
]

export const CATEGORY_REPS = 'reps'
export const CATEGORY_TIME = 'time'
export const CATEGORY_DISTANCE = 'distance'

export const CATEGORIES = [CATEGORY_REPS, CATEGORY_TIME, CATEGORY_DISTANCE]

export const CATEGORY_OPTS = [
  { label: 'Reps', value: CATEGORY_REPS },
  { label: 'Time', value: CATEGORY_TIME },
  { label: 'Distance', value: CATEGORY_DISTANCE },
]

export const DEFAULT_EXERCISE = {
  name: '',
  movementType: MOVEMENT_TYPE_PUSH,
  category: CATEGORY_REPS,
}

export const EXERCISE_SCHEMA = Yup.object().shape({
  name: Yup.string().trim().required(),
  movementType: Yup.mixed().oneOf(MOVEMENT_TYPES).required(),
  category: Yup.mixed().oneOf(CATEGORIES).required(),
  createdAt: Yup.number().positive(),
  updatedAt: Yup.number().positive(),
})

const validate = async (values) => {
  return EXERCISE_SCHEMA.validate(values, {
    stripUnknown: true,
  }).catch((yupError) => Promise.reject(transformYupToFormikError(yupError)))
}

const getExercisesRef = (uid) => `exercises/${uid}`
const getExerciseRef = (uid, key) => `${getExercisesRef(uid)}/${key}`

export const fetchExercises = async (uid) => {
  try {
    const snapshot = await db.ref(getExercisesRef(uid)).once('value')
    const values = snapshot.val()
    return values
      ? Object.entries(values).map(([key, values]) => ({ key, ...values }))
      : {}
  } catch (err) {
    throw new Error('Unable to fetch exercises')
  }
}

export const createExercise = async (uid, attrs) => {
  let exercise = { ...attrs, createdAt: timestamp() }

  try {
    exercise = await validate(exercise)
    const ref = await db.ref(getExercisesRef(uid)).push(exercise)

    return { ...exercise, key: ref.key }
  } catch (err) {
    throw new Error('Unable to create exercise')
  }
}

export const updateExercise = async (uid, attrs) => {
  let exercise = { ...attrs, updatedAt: timestamp() }

  try {
    exercise = await validate(exercise)
    await db.ref(getExerciseRef(uid, attrs.key)).update(exercise)

    return { ...exercise, key: attrs.key }
  } catch (err) {
    throw new Error('Unable to update exercise')
  }
}

export const destroyExercise = async (uid, exercise) => {
  try {
    await db.ref(getExerciseRef(uid, exercise.key)).remove()
    return exercise
  } catch (err) {
    throw new Error('Unable to destroy exercise')
  }
}

export const isExerciseCategoryTime = (exercise) => {
  return exercise.category === CATEGORY_TIME
}

export const isExerciseCategoryDistance = (exercise) => {
  return exercise.category === CATEGORY_DISTANCE
}

export const getExerciseFormattedWeight = (exercise) => {
  if (exercise.weight === 0) return

  return `${exercise.weight} ${exercise.weightUnit}`
}

export const getExerciseFormattedRx = (exercise) => {
  const { quantity } = exercise

  const formattedWeight =
    exercise.weight === 0 ? '' : `@${getExerciseFormattedWeight(exercise)}`

  if (isExerciseCategoryTime(exercise)) {
    return `${getFormattedDuration(quantity)} ${formattedWeight}`
  }

  if (isExerciseCategoryDistance(exercise)) {
    return `${getFormattedDistance(quantity)} ${formattedWeight}`
  }

  return `${quantity} reps ${formattedWeight}`
}
