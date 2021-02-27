import * as Yup from 'yup'
import axios from 'axios'
import { transformYupToFormikError } from '_api/utils'

export default class Exercise {
  static URL = 'exercises'

  static MOVEMENT_TYPE_CORE = 'core'
  static MOVEMENT_TYPE_FULL_BODY = 'full_body'
  static MOVEMENT_TYPE_HINGE = 'hinge'
  static MOVEMENT_TYPE_PULL = 'pull'
  static MOVEMENT_TYPE_PUSH = 'push'
  static MOVEMENT_TYPE_SQUAT = 'squat'
  static MOVEMENT_TYPE_OTHER = 'other'

  static MOVEMENT_TYPES = [
    Exercise.MOVEMENT_TYPE_CORE,
    Exercise.MOVEMENT_TYPE_FULL_BODY,
    Exercise.MOVEMENT_TYPE_HINGE,
    Exercise.MOVEMENT_TYPE_PULL,
    Exercise.MOVEMENT_TYPE_PUSH,
    Exercise.MOVEMENT_TYPE_SQUAT,
    Exercise.MOVEMENT_TYPE_OTHER,
  ]

  static MOVEMENT_TYPE_OPTS = [
    { label: 'Core', value: Exercise.MOVEMENT_TYPE_CORE },
    { label: 'Full body', value: Exercise.MOVEMENT_TYPE_FULL_BODY },
    { label: 'Hinge', value: Exercise.MOVEMENT_TYPE_HINGE },
    { label: 'Pull', value: Exercise.MOVEMENT_TYPE_PULL },
    { label: 'Push', value: Exercise.MOVEMENT_TYPE_PUSH },
    { label: 'Squat', value: Exercise.MOVEMENT_TYPE_SQUAT },
    { label: 'Other', value: Exercise.MOVEMENT_TYPE_OTHER },
  ]

  static DEFAULT = {
    name: '',
    movement_type: Exercise.MOVEMENT_TYPE_PUSH,
  }

  static SCHEMA = Yup.object().shape({
    id: Yup.number(),
    name: Yup.string().trim().required(),
    movement_type: Yup.mixed().oneOf(Exercise.MOVEMENT_TYPES).required(),
    created_at: Yup.string(),
    updated_at: Yup.string(),
  })

  static validate = async (attrs) => {
    return Exercise.SCHEMA.validate(attrs, {
      stripUnknown: true,
    }).catch((yupError) => Promise.reject(transformYupToFormikError(yupError)))
  }

  static fetch = async () => {
    try {
      const response = await axios.get(Exercise.URL)

      return response.data
    } catch (err) {
      throw new Error('Unable to fetch exercises')
    }
  }

  static create = async (attrs) => {
    try {
      const exercise = await Exercise.validate(attrs)

      const response = await axios.post(Exercise.URL, { exercise })

      return response.data
    } catch (err) {
      throw new Error('Unable to create exercise')
    }
  }

  static update = async (attrs) => {
    try {
      const exercise = await Exercise.validate(attrs)

      const response = await axios.put(`${Exercise.URL}/${exercise.id}`, {
        exercise,
      })

      return response.data
    } catch (err) {
      throw new Error('Unable to update exercise')
    }
  }

  static destroy = async (exercise) => {
    try {
      return axios.delete(`${Exercise.URL}/${exercise.id}`)
    } catch (err) {
      throw new Error('Unable to destroy exercise')
    }
  }
}
