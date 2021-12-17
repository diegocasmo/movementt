import React from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { View, Text } from 'native-base'
import ExerciseRx from '_components/ExerciseRx'

const RoutineExerciseInstructions = ({ exercise }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name} numberOfLines={2}>
        {exercise.name}
      </Text>
      <ExerciseRx
        textStyle={styles.instructions}
        numberOfLines={2}
        exercise={exercise}
      />
    </View>
  )
}

RoutineExerciseInstructions.propTypes = {
  exercise: PropTypes.object.isRequired,
}

export default RoutineExerciseInstructions

const styles = StyleSheet.create({
  container: {
    marginLeft: 20,
    marginRight: 20,
    alignItems: 'center',
  },
  name: {
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 38,
    textAlign: 'center',
  },
  instructions: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 28,
  },
})
