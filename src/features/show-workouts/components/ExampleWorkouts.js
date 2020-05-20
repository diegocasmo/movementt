import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'native-base'
import WorkoutItem from './WorkoutItem'
import Divider from '../../../components/Divider'
import { workouts } from '../../../seed/workouts.json'

const ExampleWorkouts = ({ onStart }) => {
  return (
    <View>
      <Divider>Example Workouts ({workouts.length})</Divider>
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
