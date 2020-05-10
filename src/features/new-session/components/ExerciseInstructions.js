import React from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { View, Text } from 'native-base'
import { getInstructions } from '../../../api/models/exercise'

const ExerciseInstructions = ({ exercise }) => {
  return (
    <View>
      <Text style={styles.name} numberOfLines={2}>
        {exercise.name}
      </Text>
      <Text style={styles.instructions} numberOfLines={2}>
        {getInstructions(exercise)}
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
    marginTop: 10,
    textAlign: 'center',
    fontSize: 28,
  },
})
