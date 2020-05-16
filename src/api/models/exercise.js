import * as Yup from 'yup'

export const REPETITION_TYPE = 'repetition'
export const TIME_TYPE = 'time'

export const EXERCISE_TYPES = [REPETITION_TYPE, TIME_TYPE]

const getUnit = (exercise) => (exercise.type === TIME_TYPE ? 'sec' : ' reps')

export const EXERCISE_TYPE_OPTIONS = [
  { label: 'Reps', value: REPETITION_TYPE },
  { label: 'Time (sec)', value: TIME_TYPE },
]

export const EMPTY_EXERCISE = {
  name: '',
  quantity: 10,
  type: REPETITION_TYPE,
  restSeconds: 20,
}

export const SCHEMA = Yup.object().shape({
  name: Yup.string().trim().required(),
  quantity: Yup.number().required().positive().min(1),
  type: Yup.mixed().oneOf(EXERCISE_TYPES).required(),
  restSeconds: Yup.number().required().positive().min(0),
})

export const getInstructions = (exercise) => {
  return `x${exercise.quantity} ${getUnit(exercise)}`
}
