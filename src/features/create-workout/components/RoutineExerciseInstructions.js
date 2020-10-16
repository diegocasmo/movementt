import React from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { View, Text } from 'native-base'
import {
  isExerciseCategoryDistance,
  isExerciseCategoryTime,
} from '_api/exercise'
import { getFormattedDistance } from '_utils/distance-utils'
import { getFormattedDuration } from '_utils/time-utils'
import ExerciseIcon from '_components/ExerciseIcon'

export const getRoutineExerciseFormattedWeight = (exercise) => {
  if (exercise.weight === 0) return

  return `${exercise.weight} ${exercise.weightUnit}`
}

const getRoutineExerciseFormatteRx = (exercise) => {
  const { quantity } = exercise

  const formattedWeight =
    exercise.weight === 0
      ? ''
      : `@${getRoutineExerciseFormattedWeight(exercise)}`

  if (isExerciseCategoryTime(exercise)) {
    return `${getFormattedDuration(quantity)} ${formattedWeight}`
  }

  if (isExerciseCategoryDistance(exercise)) {
    return `${getFormattedDistance(quantity)} ${formattedWeight}`
  }

  return `${quantity} reps ${formattedWeight}`
}

const RoutineExerciseInstructions = ({ exercise }) => {
  return (
    <View>
      <Text style={styles.name} numberOfLines={2}>
        {exercise.name}
      </Text>
      <Text style={styles.instructions} numberOfLines={2}>
        {getRoutineExerciseFormatteRx(exercise)}
      </Text>
      <View style={styles.iconContainer}>
        <ExerciseIcon exercise={exercise} />
      </View>
    </View>
  )
}

RoutineExerciseInstructions.propTypes = {
  exercise: PropTypes.object.isRequired,
}

export default RoutineExerciseInstructions

const styles = StyleSheet.create({
  name: {
    marginTop: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 38,
  },
  instructions: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 28,
  },
  iconContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
})
