import * as Yup from 'yup'
import { db } from '_api/config'
import { transformYupToFormikError } from '_api/utils'
import { timestamp } from '_utils/time-utils'
import { ROUTINE_SCHEMA } from '_api/routine'
import { TIME_ENTRY_SCHEMA } from '_api/time-entry'

export const WORKOUT_SCHEMA = Yup.object({
  createdAt: Yup.number().positive(),
  updatedAt: Yup.number().positive(),
  startedAt: Yup.number().required().positive(),
  completedAt: Yup.number().required().positive(),
  elapsedMs: Yup.number().required().positive(),
  roundsCompleted: Yup.number().required().min(0),
  timeEntries: Yup.array(Yup.object().concat(TIME_ENTRY_SCHEMA))
    .min(1)
    .required(),
  routine: Yup.object().concat(ROUTINE_SCHEMA),
})

export const validate = async (values) => {
  return WORKOUT_SCHEMA.validate(values, {
    stripUnknown: true,
  }).catch((yupError) => Promise.reject(transformYupToFormikError(yupError)))
}

const getWorkoutsRef = (uid) => `workouts/${uid}`

export const createWorkout = async (uid, attrs) => {
  let workout = { ...attrs, createdAt: timestamp() }

  try {
    workout = await validate(workout)
    const ref = await db.ref(getWorkoutsRef(uid)).push(workout)

    return { ...workout, key: ref.key }
  } catch (err) {
    throw new Error('Unable to create workout')
  }
}
