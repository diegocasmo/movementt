import React from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { View, Text } from 'native-base'
import ExerciseIcon from '_components/ExerciseIcon'
import ExerciseRx from '_components/ExerciseRx'

const RoutineExerciseInstructions = ({ exercise }) => {
  return (
    <View>
      <Text style={styles.name} numberOfLines={2}>
        {exercise.name}
      </Text>
      <ExerciseRx
        style={styles.instructions}
        numberOfLines={2}
        exercise={exercise}
      />
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
