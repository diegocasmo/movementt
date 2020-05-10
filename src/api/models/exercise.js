import * as Yup from 'yup'

export const REPETITION_TYPE = 'repetition'
export const TIME_TYPE = 'time'

export const EXERCISE_TYPES = [REPETITION_TYPE, TIME_TYPE]

const getUnit = ({ type }) => (type === 'time' ? 'sec' : ' reps')

export const EXERCISE_TYPE_OPTIONS = [
  { label: 'Reps', value: REPETITION_TYPE },
  { label: 'Time (sec)', value: TIME_TYPE },
]

export const DIFFICULTY_OPTIONS = [
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
  { label: '4', value: 4 },
  { label: '5', value: 5 },
  { label: '6', value: 6 },
  { label: '7', value: 7 },
  { label: '8', value: 8 },
  { label: '9', value: 9 },
  { label: '10', value: 10 },
]

export const EMPTY_EXERCISE = {
  name: '',
  quantity: 10,
  type: REPETITION_TYPE,
  restSeconds: 20,
}

export const VALIDATION_SCHEMA = Yup.object({
  title: Yup.string().trim().required(),
  difficulty: Yup.number().required().positive().min(1).max(10),
  rounds: Yup.number().required().positive().min(1),
  restSeconds: Yup.number().required().positive().min(0),
  exercises: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().trim().required(),
        quantity: Yup.number().required().positive().min(1),
        type: Yup.mixed().oneOf(EXERCISE_TYPES).required(),
        restSeconds: Yup.number().required().positive().min(0),
      })
    )
    .min(1)
    .required(),
})

export const getInstructions = (exercise) => {
  return `x${exercise.quantity} ${getUnit(exercise)}`
}
