import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Text } from 'native-base'
import { RoutineExercise } from '_api'
import { getUser } from '_state/reducers/auth'
import { getFormattedDuration } from '_utils/time-utils'
import { User } from '_api'

const ExerciseRx = ({ exercise, ...rest }) => {
  const user = useSelector(getUser)

  const formattedWeight =
    exercise.weight === 0
      ? ''
      : `${exercise.weight} ${User.getWeightUnitTypeLabel(user)}`

  const description = ((categoryType) => {
    switch (categoryType) {
      case RoutineExercise.CATEGORY_TYPE_TIME:
        return getFormattedDuration(exercise.quantity)
      case RoutineExercise.CATEGORY_TYPE_DISTANCE:
        return `${exercise.quantity} ${User.getDistanceUnitTypeLabel(user)}`
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
