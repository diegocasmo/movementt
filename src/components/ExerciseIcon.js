import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { Icon } from 'native-base'
import { CATEGORY_TIME, CATEGORY_DISTANCE } from '_api/exercise'

const ExerciseIcon = ({ exercise }) => {
  switch (exercise.category) {
    case CATEGORY_TIME:
      return <Icon name="md-time" />
    case CATEGORY_DISTANCE:
      return <Icon name="md-navigate" />
    default:
      return <Icon name="md-repeat" />
  }
}

ExerciseIcon.propTypes = {
  exercise: PropTypes.object.isRequired,
}

export default ExerciseIcon

const styles = StyleSheet.create({})
