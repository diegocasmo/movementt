import * as Yup from 'yup'
import { db } from '_api/config'
import { getFormattedDistance } from '_utils/distance-utils'
import { getFormattedDuration } from '_utils/time-utils'
import { timestamp } from '_utils/time-utils'
import { transformYupToFormikError } from '_api/utils'

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
  category: CATEGORY_REPS,
}

export const EXERCISE_SCHEMA = Yup.object().shape({
  key: Yup.string(),
  name: Yup.string().trim().required(),
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

export const isExerciseFromSeed = ({ createdAt, updatedAt }) => {
  return createdAt === null && updatedAt === null
}

export const getExerciseCategoryIcon = (exercise) => {
  switch (exercise.category) {
    case CATEGORY_TIME:
      return 'md-time'
    case CATEGORY_DISTANCE:
      return 'md-navigate'
    default:
      return 'md-repeat'
  }
}
