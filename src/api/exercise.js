import * as Yup from 'yup'
import axios from 'axios'
import { transformYupToFormikError } from '_api/utils'
import { getUrl } from '_api/utils/url'

export const URL = `${getUrl()}/exercises`

export const MOVEMENT_TYPE_CORE = 'core'
export const MOVEMENT_TYPE_FULL_BODY = 'full_body'
export const MOVEMENT_TYPE_HINGE = 'hinge'
export const MOVEMENT_TYPE_PULL = 'pull'
export const MOVEMENT_TYPE_PUSH = 'push'
export const MOVEMENT_TYPE_SQUAT = 'squat'
export const MOVEMENT_TYPE_OTHER = 'other'

export const MOVEMENT_TYPES = [
  MOVEMENT_TYPE_CORE,
  MOVEMENT_TYPE_FULL_BODY,
  MOVEMENT_TYPE_HINGE,
  MOVEMENT_TYPE_PULL,
  MOVEMENT_TYPE_PUSH,
  MOVEMENT_TYPE_SQUAT,
  MOVEMENT_TYPE_OTHER,
]

export const MOVEMENT_TYPE_OPTS = [
  { label: 'Core', value: MOVEMENT_TYPE_CORE },
  { label: 'Full body', value: MOVEMENT_TYPE_FULL_BODY },
  { label: 'Hinge', value: MOVEMENT_TYPE_HINGE },
  { label: 'Pull', value: MOVEMENT_TYPE_PULL },
  { label: 'Push', value: MOVEMENT_TYPE_PUSH },
  { label: 'Squat', value: MOVEMENT_TYPE_SQUAT },
  { label: 'Other', value: MOVEMENT_TYPE_OTHER },
]

export const DEFAULT = {
  name: '',
  movement_type: MOVEMENT_TYPE_PUSH,
}

export const SCHEMA = Yup.object().shape({
  id: Yup.number(),
  name: Yup.string().trim().required(),
  movement_type: Yup.mixed().oneOf(MOVEMENT_TYPES).required(),
  created_at: Yup.string(),
  updated_at: Yup.string(),
})

export const validate = async (attrs) => {
  return SCHEMA.validate(attrs, {
    stripUnknown: true,
  }).catch((yupError) => Promise.reject(transformYupToFormikError(yupError)))
}

export const fetch = async () => {
  try {
    const res = await axios.get(URL)

    return res.data
  } catch (err) {
    throw new Error('Unable to fetch exercises')
  }
}

export const create = async (attrs) => {
  try {
    const exercise = await validate(attrs)

    const res = await axios.post(URL, { exercise })

    return res.data
  } catch (err) {
    throw new Error('Unable to create exercise')
  }
}

export const update = async (attrs) => {
  try {
    const exercise = await validate(attrs)

    const res = await axios.put(`${URL}/${exercise.id}`, {
      exercise,
    })

    return res.data
  } catch (err) {
    throw new Error('Unable to update exercise')
  }
}

export const destroy = async (exercise) => {
  try {
    return axios.delete(`${URL}/${exercise.id}`)
  } catch (err) {
    throw new Error('Unable to destroy exercise')
  }
}
