import * as Yup from 'yup'
import * as Exercise from '_api/exercise'
import { transformYupToFormikError } from '_api/utils/yup'

export const CATEGORY_TYPE_REPS = 'reps'
export const CATEGORY_TYPE_TIME = 'time'
export const CATEGORY_TYPE_DISTANCE = 'distance'

export const CATEGORY_TYPES = [
  CATEGORY_TYPE_REPS,
  CATEGORY_TYPE_TIME,
  CATEGORY_TYPE_DISTANCE,
]

export const CATEGORY_TYPE_OPTS = [
  { label: 'Reps', value: CATEGORY_TYPE_REPS },
  { label: 'Time', value: CATEGORY_TYPE_TIME },
  { label: 'Distance', value: CATEGORY_TYPE_DISTANCE },
]

export const WEIGHT_UNIT_TYPE_METRIC = 'metric'
export const WEIGHT_UNIT_TYPE_IMPERIAL = 'imperial'

export const WEIGHT_UNIT_TYPES = [
  WEIGHT_UNIT_TYPE_METRIC,
  WEIGHT_UNIT_TYPE_IMPERIAL,
]

export const WEIGHT_UNIT_TYPE_OPTS = [
  { label: 'Kg', value: WEIGHT_UNIT_TYPE_METRIC },
  { label: 'lb', value: WEIGHT_UNIT_TYPE_IMPERIAL },
]

export const SCHEMA = Yup.object().shape({
  id: Yup.number(),
  name: Yup.string().trim().required(),
  category_type: Yup.mixed().oneOf(CATEGORY_TYPES).required(),
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
  weight_unit_type: Yup.mixed().oneOf(WEIGHT_UNIT_TYPES).required(),
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
      weight_unit_type: WEIGHT_UNIT_TYPE_METRIC,
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
          return { ...routineExercise, quantity: 200 }
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

export const getWeightUnitTypeLabel = (routineExercise) => {
  const weightUnitOpt = WEIGHT_UNIT_TYPE_OPTS.find(
    (weightUnitOpt) => routineExercise.weight_unit_type === weightUnitOpt.value
  )

  return weightUnitOpt.label
}

export const willCreate = (routineExercise) => !!routineExercise._create
export const willDestroy = (routineExercise) => !!routineExercise._destroy
