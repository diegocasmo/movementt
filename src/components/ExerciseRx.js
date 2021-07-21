import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'native-base'
import { RoutineExercise } from '_api'
import { getFormattedDistance } from '_utils/distance-utils'
import { getFormattedDuration } from '_utils/time-utils'

const ExerciseRx = ({ exercise, ...rest }) => {
  const formattedWeight =
    exercise.weight === 0
      ? ''
      : `${exercise.weight} ${RoutineExercise.getWeightUnitTypeLabel(exercise)}`

  const description = ((categoryType) => {
    switch (categoryType) {
      case RoutineExercise.CATEGORY_TYPE_TIME:
        return getFormattedDuration(exercise.quantity)
      case RoutineExercise.CATEGORY_TYPE_DISTANCE:
        return getFormattedDistance(exercise.quantity)
      default:
        return `${exercise.quantity} reps`
    }
  })(exercise.category_type)

  return (
    <Text {...rest}>
      {description} {formattedWeight}
    </Text>
  )
}

export default ExerciseRx

ExerciseRx.propTypes = {
  exercise: PropTypes.object.isRequired,
}
