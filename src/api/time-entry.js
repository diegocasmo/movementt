import * as Yup from 'yup'

export const TYPE_EXERCISE = 'TYPE_EXERCISE'
export const TYPE_EXERCISE_REST = 'TYPE_EXERCISE_REST'
export const TYPE_ROUND_REST = 'TYPE_ROUND_REST'

export const TIME_ENTRY_TYPES = [
  TYPE_EXERCISE,
  TYPE_EXERCISE_REST,
  TYPE_ROUND_REST,
]

export const TIME_ENTRY_SCHEMA = Yup.object({
  elapsedMs: Yup.number().positive(),
  exerciseUid: Yup.string().nullable(),
  startedAt: Yup.number().required().positive(),
  type: Yup.mixed().oneOf(TIME_ENTRY_TYPES).required(),
})
