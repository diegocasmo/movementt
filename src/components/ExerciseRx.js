import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'native-base'
import { RoutineExercise } from '_api'
import { getFormattedDuration } from '_utils/time-utils'
import { getDistanceUnitTypeLabel, getWeightUnitTypeLabel } from '_utils/units'

const ExerciseRx = ({ exercise, ...rest }) => {
  const formattedWeight =
    exercise.weight === 0
      ? ''
      : `${exercise.weight} ${getWeightUnitTypeLabel(
          exercise.weight_unit_type
        )}`

  const description = ((categoryType) => {
    switch (categoryType) {
      case RoutineExercise.CATEGORY_TYPE_TIME:
        return getFormattedDuration(exercise.quantity)
      case RoutineExercise.CATEGORY_TYPE_DISTANCE:
        return `${exercise.quantity} ${getDistanceUnitTypeLabel(
          exercise.distance_unit_type
        )}`
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
