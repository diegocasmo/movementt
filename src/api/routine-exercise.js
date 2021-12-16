import * as Yup from 'yup'
import * as Exercise from '_api/exercise'
import { transformYupToFormikError } from '_api/utils/yup'
import { buildSelectOptions } from '_utils/select-options'

export const CATEGORY_TYPE_REPS = 'reps'
export const CATEGORY_TYPE_TIME = 'time'
export const CATEGORY_TYPE_DISTANCE = 'distance'

export const CATEGORY_TYPES = [
  CATEGORY_TYPE_REPS,
  CATEGORY_TYPE_TIME,
  CATEGORY_TYPE_DISTANCE,
]

export const CATEGORY_TYPE_LABELS = {
  [CATEGORY_TYPE_REPS]: 'Reps',
  [CATEGORY_TYPE_TIME]: 'Time',
  [CATEGORY_TYPE_DISTANCE]: 'Distance',
}

export const CATEGORY_TYPE_OPTS = buildSelectOptions(CATEGORY_TYPE_LABELS)

export const SCHEMA = Yup.object().shape({
  id: Yup.number(),
  name: Yup.string().trim().required(),
  category_type: Yup.mixed().oneOf(CATEGORY_TYPES).required(),
  movement_type: Yup.mixed().oneOf(Exercise.MOVEMENT_TYPES).required(),
  quantity: Yup.number()
    .transform((v) => (isNaN(v) ? -1 : v))
    .required()
    .positive()
    .moreThan(0),
  weight: Yup.number()
    .transform((v) => (isNaN(v) ? -1 : v))
    .required()
    .positive()
    .min(0),
  rest_seconds: Yup.number()
    .transform((v) => (isNaN(v) ? -1 : v))
    .required()
    .positive()
    .min(0),
  position: Yup.number()
    .transform((v) => (isNaN(v) ? -1 : v))
    .required()
    .positive()
    .min(0),
  _destroy: Yup.boolean(),
  _create: Yup.boolean(),
  created_at: Yup.string(),
  updated_at: Yup.string(),
})

export const validate = async (values) => {
  return SCHEMA.validate(values, {
    stripUnknown: true,
  }).catch((yupError) => Promise.reject(transformYupToFormikError(yupError)))
}

export const build = async (exercise) => {
  try {
    const routineExercise = await validate({
      name: '',
      category_type: CATEGORY_TYPE_REPS,
      movement_type: Exercise.MOVEMENT_TYPE_PUSH,
      quantity: 10,
      weight: 0,
      rest_seconds: 0,
      position: 0,
      ...exercise,
    })

    // Make sure exercise quantity is correctly defaulted according
    // to its category
    return ((routineExercise) => {
      switch (routineExercise.category_type) {
        case CATEGORY_TYPE_TIME:
          return { ...routineExercise, quantity: 30 }
        case CATEGORY_TYPE_DISTANCE:
          return { ...routineExercise, quantity: 1 }
        default:
          return { ...routineExercise, quantity: 10 }
      }
    })(routineExercise)
  } catch (err) {
    throw new Error('Unable to build routine exercise')
  }
}

export const isCategoryTypeTime = (routineExercise) => {
  return routineExercise.category_type === CATEGORY_TYPE_TIME
}

export const isCategoryTypeReps = (routineExercise) => {
  return routineExercise.category_type === CATEGORY_TYPE_REPS
}

export const isCategoryTypeDistance = (routineExercise) => {
  return routineExercise.category_type === CATEGORY_TYPE_DISTANCE
}

export const willCreate = (routineExercise) => !!routineExercise._create
export const willDestroy = (routineExercise) => !!routineExercise._destroy
