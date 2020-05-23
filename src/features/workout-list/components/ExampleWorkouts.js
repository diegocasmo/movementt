import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { View, H1 } from 'native-base'
import WorkoutItem from './WorkoutItem'
import { workouts } from '../../../seed/workouts.json'

const ExampleWorkouts = ({ onStart }) => {
  return (
    <View>
      <H1 style={styles.h1}>Example Workouts ({workouts.length})</H1>
      {workouts.map((workout) => (
        <WorkoutItem key={workout.key} workout={workout} onStart={onStart} />
      ))}
    </View>
  )
}

ExampleWorkouts.propTypes = {
  onStart: PropTypes.func.isRequired,
}

export default ExampleWorkouts

const styles = StyleSheet.create({
  h1: {
    marginTop: 15,
    marginBottom: 15,
  },
})
