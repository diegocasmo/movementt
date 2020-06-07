import * as Yup from 'yup'
import { getFormattedDuration } from '../../utils/time-utils'

export default class Exercise {
  static QTY_REPETITION_UNIT = 'rep'
  static QTY_TIME_UNIT = 'second'
  static QTY_DISTANCE_UNIT = 'Km'
  static QTY_UNITS = [
    Exercise.QTY_REPETITION_UNIT,
    Exercise.QTY_TIME_UNIT,
    Exercise.QTY_DISTANCE_UNIT,
  ]
  static QTY_UNIT_OPTS = [
    { label: 'reps', value: Exercise.QTY_REPETITION_UNIT },
    { label: 's', value: Exercise.QTY_TIME_UNIT },
    { label: 'Km', value: Exercise.QTY_DISTANCE_UNIT },
  ]

  static WEIGHT_KG_UNIT = 'Kg'
  static WEIGHT_UNITS = [Exercise.WEIGHT_KG_UNIT]
  static WEIGHT_UNIT_OPTS = [{ label: 'Kg', value: Exercise.WEIGHT_KG_UNIT }]

  static EMPTY = {
    name: '',
    quantity: 10,
    quantityUnit: Exercise.QTY_REPETITION_UNIT,
    weight: 0,
    weightUnit: Exercise.WEIGHT_KG_UNIT,
    restSeconds: 0,
  }

  static getSchema = () => {
    return Yup.object().shape({
      name: Yup.string().trim().required(),
      quantity: Yup.number().required().positive().min(1),
      quantityUnit: Yup.mixed().oneOf(Exercise.QTY_UNITS).required(),
      weight: Yup.number().required().positive().min(0),
      weightUnit: Yup.mixed().oneOf(Exercise.WEIGHT_UNITS).required(),
      restSeconds: Yup.number().required().positive().min(0),
    })
  }

  static isQtyUnitTime = (exercise) =>
    exercise.quantityUnit === Exercise.QTY_TIME_UNIT


  static getFormattedWeight = (exercise) => {
    if (exercise.weight === 0) return

    return `${exercise.weight} ${exercise.weightUnit}`
  }


  static getInstructions = (exercise) => {
    const { quantity } = exercise

    const formattedWeight =
      exercise.weight === 0 ? '' : `@${Exercise.getFormattedWeight(exercise)}`

    if (Exercise.isQtyUnitTime(exercise)) {
      return `${getFormattedDuration(quantity)} ${formattedWeight}`
    }

    const unitOpt = Exercise.QTY_UNIT_OPTS.find(
      ({ value }) => exercise.quantityUnit === value
    )
    return `${quantity} ${unitOpt.label} ${formattedWeight}`
  }
}
