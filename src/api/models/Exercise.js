import * as Yup from 'yup'
import { getFormattedDuration } from '../../utils/time-utils'
import { getFormattedDistance } from '../../utils/distance-utils'

export default class Exercise {
  static TYPE_REPS = 'reps'
  static TYPE_TIME = 'time'
  static TYPE_DISTANCE = 'distance'

  static TYPES = [
    Exercise.TYPE_REPS,
    Exercise.TYPE_TIME,
    Exercise.TYPE_DISTANCE,
  ]

  static TYPE_OPTS = [
    { label: 'Repetitions', value: Exercise.TYPE_REPS },
    { label: 'Time', value: Exercise.TYPE_TIME },
    { label: 'Distance', value: Exercise.TYPE_DISTANCE },
  ]

  static REP_UNIT = 'rep'
  static TIME_UNIT = 'second'
  static DISTANCE_UNIT = 'm'

  static QTY_UNITS = [
    Exercise.REP_UNIT,
    Exercise.TIME_UNIT,
    Exercise.DISTANCE_UNIT,
  ]

  static WEIGHT_KG_UNIT = 'Kg'
  static WEIGHT_UNITS = [Exercise.WEIGHT_KG_UNIT]

  static EMPTY = {
    name: '',
    type: Exercise.TYPE_REPS,
    quantity: 10,
    quantityUnit: Exercise.REP_UNIT,
    weight: 0,
    weightUnit: Exercise.WEIGHT_KG_UNIT,
    restSeconds: 0,
  }

  static getSchema = () => {
    return Yup.object().shape({
      name: Yup.string().trim().required(),
      type: Yup.mixed().oneOf(Exercise.TYPES).required(),
      quantity: Yup.number().required().positive().min(1),
      quantityUnit: Yup.mixed().oneOf(Exercise.QTY_UNITS).required(),
      weight: Yup.number().required().positive().min(0),
      weightUnit: Yup.mixed().oneOf(Exercise.WEIGHT_UNITS).required(),
      restSeconds: Yup.number().required().positive().min(0),
    })
  }

  static isTypeTime = (exercise) => exercise.type === Exercise.TYPE_TIME

  static isTypeDistance = (exercise) => exercise.type === Exercise.TYPE_DISTANCE

  static getFormattedWeight = (exercise) => {
    if (exercise.weight === 0) return

    return `${exercise.weight} ${exercise.weightUnit}`
  }

  static getInstructions = (exercise) => {
    const { quantity } = exercise

    const formattedWeight =
      exercise.weight === 0 ? '' : `@${Exercise.getFormattedWeight(exercise)}`

    if (Exercise.isTypeTime(exercise)) {
      return `${getFormattedDuration(quantity)} ${formattedWeight}`
    }

    if (Exercise.isTypeDistance(exercise)) {
      return `${getFormattedDistance(quantity)} ${formattedWeight}`
    }

    return `${quantity} reps ${formattedWeight}`
  }
}
