import * as Yup from 'yup'
import { transformYupToFormikError } from '_api/utils/yup'
import { buildSelectOptions } from '_utils/select-options'

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

export const MOVEMENT_TYPE_LABELS = {
  [MOVEMENT_TYPE_CORE]: 'Core',
  [MOVEMENT_TYPE_FULL_BODY]: 'Full body',
  [MOVEMENT_TYPE_HINGE]: 'Hinge',
  [MOVEMENT_TYPE_PULL]: 'Pull',
  [MOVEMENT_TYPE_PUSH]: 'Push',
  [MOVEMENT_TYPE_SQUAT]: 'Squat',
  [MOVEMENT_TYPE_OTHER]: 'Other',
}

export const MOVEMENT_TYPE_OPTS = buildSelectOptions(MOVEMENT_TYPE_LABELS)

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
