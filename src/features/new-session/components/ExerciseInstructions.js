import React from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { View, Text } from 'native-base'

const MS_IN_A_SECOND = 1000

const ExerciseInstructions = ({ exercise }) => {
  const isTimeBase = ({ type }) => type === 'time'
  const getExerciseQty = (exercise) =>
    isTimeBase(exercise)
      ? exercise.quantity / MS_IN_A_SECOND
      : exercise.quantity

  const getExerciseUnit = (exercise) =>
    isTimeBase(exercise) ? 's' : ' repetitions'

  return (
    <View>
      <Text style={styles.name} numberOfLines={2}>
        {exercise.name}
      </Text>
      <Text style={styles.instructions} numberOfLines={2}>
        x{getExerciseQty(exercise)}
        {getExerciseUnit(exercise)}
      </Text>
    </View>
  )
}

ExerciseInstructions.propTypes = {
  exercise: PropTypes.object.isRequired,
}

export default ExerciseInstructions

const styles = StyleSheet.create({
  name: {
    marginTop: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 38,
  },
  instructions: {
    textAlign: 'center',
    fontSize: 28,
  },
})
