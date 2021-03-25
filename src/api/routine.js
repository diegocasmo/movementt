import * as Yup from 'yup'
import axios from 'axios'
import { transformYupToFormikError } from '_api/utils'
import { getUrl } from '_api/utils/url'
import { RoutineExercise } from '_api'

export const URL = `${getUrl()}/routines`

export const DEFAULT = {
  name: '',
  rounds: 4,
  rest_seconds: 0,
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
  rest_seconds: Yup.number()
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

export const fetch = async () => {
  try {
    const res = await axios.get(URL)

    return res.data
  } catch (err) {
    throw new Error('Unable to fetch routines')
  }
}

export const create = async (routine) => {
  try {
    const { exercises, ...rest } = await validate(routine)

    const res = await axios.post(URL, {
      routine: {
        ...rest,
        exercises_attributes: exercises,
      },
    })

    return res.data
  } catch (err) {
    throw new Error('Unable to create routine')
  }
}

export const update = async (routine) => {
  try {
    const { exercises, ...rest } = await validate(routine)

    const res = await axios.put(`${URL}/${routine.id}`, {
      routine: {
        ...rest,
        exercises_attributes: exercises,
      },
    })

    return res.data
  } catch (err) {
    throw new Error('Unable to update routine')
  }
}

export const destroy = async (routine) => {
  try {
    await axios.delete(`${URL}/${routine.id}`)
  } catch (err) {
    throw new Error('Unable to destroy routine')
  }
}

export const getFormattedExercises = (routine) => {
  const names = routine.exercises.map((ex) => ex.name)
  if (names.length === 1) return names

  return `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`
}
