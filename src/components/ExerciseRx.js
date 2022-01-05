import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { View, Text } from 'native-base'
import { RoutineExercise } from '_api'
import Duration from '_components/time/Duration'
import { getDistanceUnitTypeLabel, getWeightUnitTypeLabel } from '_utils/units'

const ExerciseRx = ({ exercise, textStyle, style, ...rest }) => {
  const formattedWeight =
    exercise.weight === 0
      ? ''
      : `@${exercise.weight} ${getWeightUnitTypeLabel(
          exercise.weight_unit_type
        )}`

  const description = ((categoryType) => {
    switch (categoryType) {
      case RoutineExercise.CATEGORY_TYPE_TIME:
        return (
          <Duration
            style={[styles.duration, textStyle]}
            elapsedMs={exercise.quantity}
          />
        )
      case RoutineExercise.CATEGORY_TYPE_DISTANCE:
        return (
          <Text style={textStyle}>
            {exercise.quantity}&nbsp;
            {getDistanceUnitTypeLabel(exercise.distance_unit_type)}
          </Text>
        )
      default:
        return <Text style={textStyle}>{exercise.quantity} reps</Text>
    }
  })(exercise.category_type)

  return (
    <View style={[styles.container, style]} {...rest}>
      {description}
      <Text style={textStyle}> {formattedWeight}</Text>
    </View>
  )
}

export default ExerciseRx

ExerciseRx.defaultProps = {
  style: {},
  textStyle: {},
}

ExerciseRx.propTypes = {
  exercise: PropTypes.object.isRequired,
  style: PropTypes.object,
  textStyle: PropTypes.object,
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  duration: {
    fontWeight: 'normal',
    fontSize: 16,
  },
})
