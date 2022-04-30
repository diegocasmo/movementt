import * as Yup from 'yup'
import { transformYupToFormikError } from '_models/utils/yup'
import * as RoutineExercise from '_models/routine-exercise'
import { TIME_ENTRY_SCHEMA } from '_models/time-entry'

export const WORKOUT_SCHEMA = Yup.object({
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
  elapsed_ms: Yup.number().required().positive(),
  rounds_completed: Yup.number().required().min(0),
  started_at: Yup.string().required(),
  completed_at: Yup.string().required(),
  time_entries: Yup.array(Yup.object().concat(TIME_ENTRY_SCHEMA))
    .min(1)
    .required(),
  exercises: Yup.array(Yup.object().concat(RoutineExercise.SCHEMA))
    .min(1)
    .required(),
  created_at: Yup.string(),
  updated_at: Yup.string(),
})

export const validate = async (values) => {
  return WORKOUT_SCHEMA.validate(values, {
    stripUnknown: true,
  }).catch((yupError) => Promise.reject(transformYupToFormikError(yupError)))
}

export const build = async (session) => {
  try {
    const {
      routine,
      roundsCompleted,
      elapsedMs,
      startedAt,
      completedAt,
      timeEntries,
    } = session

    const { exercises, ...rest } = await validate(
      WORKOUT_SCHEMA.cast({
        name: routine.name,
        rounds: routine.rounds,
        rest_ms: routine.rest_ms,
        elapsed_ms: elapsedMs,
        rounds_completed: roundsCompleted,
        started_at: new Date(startedAt),
        completed_at: new Date(completedAt),
        time_entries: timeEntries,
        exercises: routine.exercises,
      })
    )

    return { ...rest, exercises_attributes: exercises }
  } catch (err) {
    throw new Error('Unable to build workout')
  }
}
