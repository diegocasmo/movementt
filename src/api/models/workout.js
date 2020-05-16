import * as Yup from 'yup'
import { EMPTY_EXERCISE, SCHEMA as EXERCISE_SCHEMA } from './exercise'

export const EMPTY_WORKOUT = {
  title: '',
  rounds: 4,
  restSeconds: 30,
  exercises: [EMPTY_EXERCISE],
}

export const SCHEMA = Yup.object({
  title: Yup.string().trim().required(),
  rounds: Yup.number().required().positive().min(1),
  restSeconds: Yup.number().required().positive().min(0),
  exercises: Yup.array()
    .of(Yup.mixed().concat(EXERCISE_SCHEMA))
    .min(1)
    .required(),
})
