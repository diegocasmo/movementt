import * as Yup from 'yup'
import { getFormattedDuration } from '_utils/time-utils'
import { getFormattedDistance } from '_utils/distance-utils'
import Exercise from './Exercise'

export default class RoutineExercise {
  static CATEGORY_REPS = Exercise.CATEGORY_REPS
  static CATEGORY_TIME = Exercise.CATEGORY_TIME
  static CATEGORY_DISTANCE = Exercise.CATEGORY_DISTANCE

  static CATEGORIES = Exercise.CATEGORIES

  static CATEGORY_OPTS = Exercise.CATEGORY_OPTS

  static REP_UNIT = 'rep'
  static TIME_UNIT = 'second'
  static DISTANCE_UNIT = 'm'

  static QTY_UNITS = [
    RoutineExercise.REP_UNIT,
    RoutineExercise.TIME_UNIT,
    RoutineExercise.DISTANCE_UNIT,
  ]

  static WEIGHT_KG_UNIT = 'Kg'
  static WEIGHT_UNITS = [RoutineExercise.WEIGHT_KG_UNIT]

  static EMPTY = {
    name: '',
    type: Exercise.CATEGORY_REPS,
    quantity: 10,
    quantityUnit: RoutineExercise.REP_UNIT,
    weight: 0,
    weightUnit: RoutineExercise.WEIGHT_KG_UNIT,
    restSeconds: 0,
  }

  static getSchema = () => {
    return Yup.object().shape({
      name: Yup.string().trim().required(),
      type: Yup.mixed().oneOf(RoutineExercise.CATEGORIES).required(),
      quantity: Yup.number().required().positive().min(1),
      quantityUnit: Yup.mixed().oneOf(RoutineExercise.QTY_UNITS).required(),
      weight: Yup.number().required().positive().min(0),
      weightUnit: Yup.mixed().oneOf(RoutineExercise.WEIGHT_UNITS).required(),
      restSeconds: Yup.number().required().positive().min(0),
    })
  }

  static isCategoryTime = Exercise.isCategoryTime

  static isCategoryDistance = Exercise.isCategoryDistance

  static getFormattedWeight = (routineExercise) => {
    if (routineExercise.weight === 0) return

    return `${routineExercise.weight} ${routineExercise.weightUnit}`
  }

  static formattedRx = (routineExercise) => {
    const { quantity } = routineExercise

    const formattedWeight =
      routineExercise.weight === 0
        ? ''
        : `@${RoutineExercise.getFormattedWeight(routineExercise)}`

    if (RoutineExercise.isCategoryTime(routineExercise)) {
      return `${getFormattedDuration(quantity)} ${formattedWeight}`
    }

    if (RoutineExercise.isCategoryDistance(routineExercise)) {
      return `${getFormattedDistance(quantity)} ${formattedWeight}`
    }

    return `${quantity} reps ${formattedWeight}`
  }
}
