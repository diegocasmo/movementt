import * as Yup from 'yup'
import { db } from '_api/config/firebase'
import { transformYupToFormikError } from '_api/utils/yup'
import { timestamp } from '_utils/time-utils'
import { Routine } from '_api'
import { TIME_ENTRY_SCHEMA } from '_api/time-entry'

export const WORKOUT_SCHEMA = Yup.object({
  created_at: Yup.number().positive(),
  updated_at: Yup.number().positive(),
  started_at: Yup.number().required().positive(),
  completed_at: Yup.number().required().positive(),
  elapsed_ms: Yup.number().required().positive(),
  rounds_completed: Yup.number().required().min(0),
  time_entries: Yup.array(Yup.object().concat(TIME_ENTRY_SCHEMA))
    .min(1)
    .required(),
  routine: Yup.object().concat(Routine.SCHEMA),
})

export const validate = async (values) => {
  return WORKOUT_SCHEMA.validate(values, {
    stripUnknown: true,
  }).catch((yupError) => Promise.reject(transformYupToFormikError(yupError)))
}

const getWorkoutsRef = (uid) => `workouts/${uid}`

export const fetchWorkouts = async (uid, cursorKey = null, pageSize = 10) => {
  try {
    let snapshot = db.ref(getWorkoutsRef(uid))
    if (cursorKey === null) {
      snapshot = await snapshot.orderByKey().limitToLast(pageSize).once('value')
    } else {
      snapshot = await snapshot
        .orderByKey()
        .endAt(cursorKey)
        .limitToLast(pageSize)
        .once('value')
    }

    const values = snapshot.val()
    return values
      ? Object.entries(values).map(([key, values]) => ({ key, ...values }))
      : {}
  } catch (err) {
    throw new Error(err.message)
  }
}

export const createWorkout = async (uid, attrs) => {
  let workout = { ...attrs, created_at: timestamp() }

  try {
    workout = await validate(workout)
    const ref = await db.ref(getWorkoutsRef(uid)).push(workout)

    return { ...workout, key: ref.key }
  } catch (err) {
    throw new Error('Unable to create workout')
  }
}
