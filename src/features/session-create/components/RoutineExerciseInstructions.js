import React from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { View, Text } from 'native-base'
import { RoutineExercise } from '_api'
import ExerciseIcon from '_components/ExerciseIcon'

const RoutineExerciseInstructions = ({ exercise }) => {
  return (
    <View>
      <Text style={styles.name} numberOfLines={2}>
        {exercise.name}
      </Text>
      <Text style={styles.instructions} numberOfLines={2}>
        {RoutineExercise.getFormattedRx(exercise)}
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
