import * as Yup from 'yup'
import { db } from '_api/config'
import { getFormattedDuration } from '_utils/time-utils'
import { getFormattedDistance } from '_utils/distance-utils'
import { timestamp } from '_utils/time-utils'

export default class Exercise {
  static CATEGORY_REPS = 'reps'
  static CATEGORY_TIME = 'time'
  static CATEGORY_DISTANCE = 'distance'

  static CATEGORIES = [
    Exercise.CATEGORY_REPS,
    Exercise.CATEGORY_TIME,
    Exercise.CATEGORY_DISTANCE,
  ]

  static CATEGORY_OPTS = [
    { label: 'Reps', value: Exercise.CATEGORY_REPS },
    { label: 'Time', value: Exercise.CATEGORY_TIME },
    { label: 'Distance', value: Exercise.CATEGORY_DISTANCE },
  ]

  static EMPTY = {
    name: '',
    category: Exercise.CATEGORY_REPS,
  }

  static getSchema = () => {
    return Yup.object().shape({
      name: Yup.string().trim().required(),
      category: Yup.mixed().oneOf(Exercise.CATEGORIES).required(),
      createdAt: Yup.number().positive(),
      updatedAt: Yup.number().positive(),
    })
  }

  static validate = async (values) => {
    return Exercise.getSchema()
      .validate(values, { stripUnknown: true })
      .catch((yupError) => Promise.reject(transformYupToFormikError(yupError)))
  }

  static getExercisesRef = (uid) => `exercises/${uid}`
  static getExerciseRef = (uid, key) =>
    `${Exercise.getExercisesRef(uid)}/${key}`

  static fetch = async (uid) => {
    try {
      const snapshot = await db.ref(Exercise.getExercisesRef(uid)).once('value')
      const values = snapshot.val()
      return values
        ? Object.entries(values).map(([key, values]) => ({ key, ...values }))
        : {}
    } catch (err) {
      throw new Error('Unable to fetch exercises')
    }
  }

  static create = async (uid, attrs) => {
    let exercise = { ...attrs, createdAt: timestamp() }

    try {
      exercise = await Exercise.validate(exercise)
      const ref = await db.ref(Exercise.getExercisesRef(uid)).push(exercise)

      return { ...exercise, key: ref.key }
    } catch (err) {
      throw new Error('Unable to create exercise')
    }
  }

  static update = async (uid, attrs) => {
    let exercise = { ...attrs, updatedAt: timestamp() }

    try {
      exercise = await Exercise.validate(exercise)
      await db.ref(Exercise.getExerciseRef(uid, attrs.key)).update(exercise)

      return { ...exercise, key: attrs.key }
    } catch (err) {
      throw new Error('Unable to update exercise')
    }
  }

  static destroy = async (uid, exercise) => {
    try {
      await db.ref(Exercise.getExerciseRef(uid, exercise.key)).remove()
      return exercise
    } catch (err) {
      throw new Error('Unable to destroy exercise')
    }
  }

  static isCategoryTime = (exercise) => {
    return exercise.category === Exercise.CATEGORY_TIME
  }

  static isCategoryDistance = (exercise) => {
    return exercise.category === Exercise.CATEGORY_DISTANCE
  }

  static getFormattedWeight = (exercise) => {
    if (exercise.weight === 0) return

    return `${exercise.weight} ${exercise.weightUnit}`
  }

  static formattedRx = (exercise) => {
    const { quantity } = exercise

    const formattedWeight =
      exercise.weight === 0 ? '' : `@${Exercise.getFormattedWeight(exercise)}`

    if (Exercise.isCategoryTime(exercise)) {
      return `${getFormattedDuration(quantity)} ${formattedWeight}`
    }

    if (Exercise.isCategoryDistance(exercise)) {
      return `${getFormattedDistance(quantity)} ${formattedWeight}`
    }

    return `${quantity} reps ${formattedWeight}`
  }

  static getCategoryIcon = (exercise) => {
    switch (exercise.category) {
      case Exercise.CATEGORY_TIME:
        return 'md-time'
      case Exercise.CATEGORY_DISTANCE:
        return 'md-navigate'
      default:
        return 'md-repeat'
    }
  }
}
