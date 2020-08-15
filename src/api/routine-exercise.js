import * as Yup from 'yup'
import { getFormattedDuration } from '_utils/time-utils'
import { getFormattedDistance } from '_utils/distance-utils'
import {
  CATEGORIES,
  CATEGORY_REPS,
  isExerciseCategoryDistance,
  isExerciseCategoryTime,
} from '_api/exercise'

const REP_UNIT = 'rep'
const TIME_UNIT = 'second'
const DISTANCE_UNIT = 'm'

const QTY_UNITS = [REP_UNIT, TIME_UNIT, DISTANCE_UNIT]

const WEIGHT_KG_UNIT = 'Kg'
const WEIGHT_UNITS = [WEIGHT_KG_UNIT]

export const DEFAULT_ROUTINE_EXERCISE = {
  name: '',
  type: CATEGORY_REPS,
  quantity: 10,
  quantityUnit: REP_UNIT,
  weight: 0,
  weightUnit: WEIGHT_KG_UNIT,
  restSeconds: 0,
}

export const ROUTINE_EXERCISE_SCHEMA = Yup.object().shape({
  name: Yup.string().trim().required(),
  type: Yup.mixed().oneOf(CATEGORIES).required(),
  quantity: Yup.number().required().positive().min(1),
  quantityUnit: Yup.mixed().oneOf(QTY_UNITS).required(),
  weight: Yup.number().required().positive().min(0),
  weightUnit: Yup.mixed().oneOf(WEIGHT_UNITS).required(),
  restSeconds: Yup.number().required().positive().min(0),
})

export const getRoutineExerciseFormattedWeight = (routineExercise) => {
  if (routineExercise.weight === 0) return

  return `${routineExercise.weight} ${routineExercise.weightUnit}`
}

export const getRoutineExerciseFormatteRx = (routineExercise) => {
  const { quantity } = routineExercise

  const formattedWeight =
    routineExercise.weight === 0
      ? ''
      : `@${getRoutineExerciseFormattedWeight(routineExercise)}`

  if (isExerciseCategoryTime(routineExercise)) {
    return `${getFormattedDuration(quantity)} ${formattedWeight}`
  }

  if (isExerciseCategoryDistance(routineExercise)) {
    return `${getFormattedDistance(quantity)} ${formattedWeight}`
  }

  return `${quantity} reps ${formattedWeight}`
}
