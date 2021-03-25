import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from '_components/Icon'
import { RoutineExercise } from '_api'

const ExerciseIcon = ({ exercise }) => {
  switch (exercise.category_type) {
    case RoutineExercise.CATEGORY_TYPE_TIME:
      return <Icon name="md-time-outline" />
    case RoutineExercise.CATEGORY_TYPE_DISTANCE:
      return <Icon name="md-location" />
    default:
      return <Icon name="md-repeat-sharp" />
  }
}

ExerciseIcon.propTypes = {
  exercise: PropTypes.object.isRequired,
}

export default ExerciseIcon
