import React from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { View, Text } from 'native-base'
import Exercise from '../../../api/models/Exercise'

const ExerciseDetails = ({ exercise, number }) => {
  return (
    <View style={styles.container}>
      <View style={styles.bullet}>
        <Text>{number}. </Text>
      </View>
      <View style={styles.bulletText}>
        <Text>
          {exercise.name} {Exercise.getInstructions(exercise)} (
          {Exercise.getFormattedRest(exercise)})
        </Text>
      </View>
    </View>
  )
}

ExerciseDetails.propTypes = {
  number: PropTypes.number.isRequired,
  exercise: PropTypes.object.isRequired,
}

export default ExerciseDetails

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    flex: 1,
  },
  bullet: {},
  bulletText: {
    flex: 1,
    marginBottom: 8,
  },
})
