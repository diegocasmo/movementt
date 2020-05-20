import * as Yup from 'yup'

export default class Exercise {
  static REPETITION_TYPE = 'repetition'
  static TIME_TYPE = 'time'
  static TYPES = [Exercise.REPETITION_TYPE, Exercise.TIME_TYPE]
  static TYPE_OPTS = [
    { label: 'Reps', value: Exercise.REPETITION_TYPE },
    { label: 'Time (sec)', value: Exercise.TIME_TYPE },
  ]

  static EMPTY = {
    name: '',
    quantity: 10,
    type: Exercise.REPETITION_TYPE,
    restSeconds: 20,
  }

  static getSchema = () => {
    return Yup.object().shape({
      name: Yup.string().trim().required(),
      quantity: Yup.number().required().positive().min(1),
      type: Yup.mixed().oneOf(Exercise.TYPES).required(),
      restSeconds: Yup.number().required().positive().min(0),
    })
  }

  static getUnit = (exercise) => {
    return exercise.type === Exercise.TIME_TYPE ? 'sec' : ' reps'
  }

  static getInstructions = (exercise) => {
    return `x${exercise.quantity} ${Exercise.getUnit(exercise)}`
  }
}
