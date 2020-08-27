import * as Yup from 'yup'
import {
  CATEGORIES,
  CATEGORY_DISTANCE,
  CATEGORY_REPS,
  CATEGORY_TIME,
} from '_api/exercise'
import { transformYupToFormikError } from '_api/utils'

export const REP_UNIT = 'rep'
export const TIME_UNIT = 'second'
export const DISTANCE_UNIT = 'm'

export const QTY_UNITS = [REP_UNIT, TIME_UNIT, DISTANCE_UNIT]

export const WEIGHT_KG_UNIT = 'Kg'
export const WEIGHT_UNITS = [WEIGHT_KG_UNIT]

export const ROUTINE_EXERCISE_SCHEMA = Yup.object().shape({
  name: Yup.string().trim().required(),
  category: Yup.mixed().oneOf(CATEGORIES).required(),
  quantity: Yup.number()
    .transform((v) => (isNaN(v) ? -1 : v))
    .required()
    .positive()
    .min(1),
  quantityUnit: Yup.mixed().oneOf(QTY_UNITS).required(),
  weight: Yup.number()
    .transform((v) => (isNaN(v) ? -1 : v))
    .required()
    .positive()
    .min(0),
  weightUnit: Yup.mixed().oneOf(WEIGHT_UNITS).required(),
  restSeconds: Yup.number()
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
      name: '',
      category: CATEGORY_REPS,
      quantity: 10,
      quantityUnit: REP_UNIT,
      weight: 0,
      weightUnit: WEIGHT_KG_UNIT,
      restSeconds: 0,
      ...exercise,
    })

    // Make sure exercise quantity/quantityUnit are correctly setup according
    // to its category
    return ((routineExercise) => {
      switch (routineExercise.category) {
        case CATEGORY_TIME:
          return { ...routineExercise, quantity: 30, quantityUnit: TIME_UNIT }
        case CATEGORY_DISTANCE:
          return {
            ...routineExercise,
            quantity: 200,
            quantityUnit: DISTANCE_UNIT,
          }
        default:
          return { ...routineExercise, quantity: 10, quantityUnit: REP_UNIT }
      }
    })(routineExercise)
  } catch (err) {
    throw new Error('Unable to build routine exercise')
  }
}
