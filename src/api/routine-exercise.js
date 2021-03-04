import * as Yup from 'yup'
import Exercise from '_api/exercise'
import { getFormattedDistance } from '_utils/distance-utils'
import { getFormattedDuration } from '_utils/time-utils'
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

export const WEIGHT_KG_UNIT = 'Kg'
export const WEIGHT_UNITS = [WEIGHT_KG_UNIT]

export const ROUTINE_EXERCISE_SCHEMA = Yup.object().shape({
  uid: Yup.string().required(),
  name: Yup.string().trim().required(),
  category: Yup.mixed().oneOf(CATEGORIES).required(),
  movement_type: Yup.mixed().oneOf(Exercise.MOVEMENT_TYPES).required(),
  quantity: Yup.number()
    .transform((v) => (isNaN(v) ? -1 : v))
    .required()
    .positive()
    .min(1),
  weight: Yup.number()
    .transform((v) => (isNaN(v) ? -1 : v))
    .required()
    .positive()
    .min(0),
  weight_unit: Yup.mixed().oneOf(WEIGHT_UNITS).required(),
  rest_seconds: Yup.number()
    .transform((v) => (isNaN(v) ? -1 : v))
    .required()
    .positive()
    .min(0),
})

export const validate = async (values) => {
  return ROUTINE_EXERCISE_SCHEMA.validate(values, {
    stripUnknown: true,
  }).catch((yupError) => Promise.reject(transformYupToFormikError(yupError)))
}

export const buildRoutineExercise = async (exercise) => {
  try {
    const routineExercise = await validate({
      uid: `${new Date().getTime()}`,
      name: '',
      category: CATEGORY_REPS,
      movement_type: Exercise.MOVEMENT_TYPE_PUSH,
      quantity: 10,
      weight: 0,
      weight_unit: WEIGHT_KG_UNIT,
      rest_seconds: 0,
      ...exercise,
    })

    // Make sure exercise quantity is correctly defaulted according
    // to its category
    return ((routineExercise) => {
      switch (routineExercise.category) {
        case CATEGORY_TIME:
          return { ...routineExercise, quantity: 30 }
        case CATEGORY_DISTANCE:
          return { ...routineExercise, quantity: 200 }
        default:
          return { ...routineExercise, quantity: 10 }
      }
    })(routineExercise)
  } catch (err) {
    throw new Error('Unable to build routine exercise')
  }
}

export const isExerciseCategoryTime = (exercise) => {
  return exercise.category === CATEGORY_TIME
}

export const isExerciseCategoryReps = (exercise) => {
  return exercise.category === CATEGORY_REPS
}

export const isExerciseCategoryDistance = (exercise) => {
  return exercise.category === CATEGORY_DISTANCE
}

export const getExerciseFormattedWeight = (exercise) => {
  if (exercise.weight === 0) return

  return `${exercise.weight} ${exercise.weight_unit}`
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
