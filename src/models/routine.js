import * as Yup from 'yup'
import { transformYupToFormikError } from '_models/utils/yup'
import * as RoutineExercise from '_models/routine-exercise'

export const DEFAULT = {
  name: '',
  rounds: 4,
  rest_ms: 0,
  exercises: [],
}

export const SCHEMA = Yup.object({
  id: Yup.number(),
  name: Yup.string().trim().required(),
  rounds: Yup.number()
    .transform((v) => (isNaN(v) ? -1 : v))
    .required()
    .positive()
    .min(1),
  rest_ms: Yup.number()
    .transform((v) => (isNaN(v) ? -1 : v))
    .required()
    .positive()
    .min(0),
  created_at: Yup.string(),
  updated_at: Yup.string(),
  exercises: Yup.array(Yup.object().concat(RoutineExercise.SCHEMA))
    .min(1)
    .required(),
})

export const validate = async (values) => {
  return SCHEMA.validate(values, {
    stripUnknown: true,
  }).catch((yupError) => Promise.reject(transformYupToFormikError(yupError)))
}

export const isPeristed = (routine) => !!routine.created_at
