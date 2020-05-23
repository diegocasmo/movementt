import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import { Button, View, Text, H1 } from 'native-base'
import { getWorkouts } from '../../../state/reducers/workouts'
import WorkoutItem from './WorkoutItem'

const MyWorkouts = ({ onCreateWorkout, onStart, onUpdate, onDelete }) => {
  const workouts = useSelector(getWorkouts)

  return (
    <View>
      <H1 style={styles.h1}>My Workouts ({workouts.length})</H1>
      {workouts.length === 0 ? (
        <Button block primary style={styles.btn} onPress={onCreateWorkout}>
          <Text>Create workout</Text>
        </Button>
      ) : (
        workouts.map((workout) => (
          <WorkoutItem
            key={workout.key}
            workout={workout}
            onStart={onStart}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))
      )}
    </View>
  )
}

MyWorkouts.propTypes = {
  onCreateWorkout: PropTypes.func.isRequired,
  onStart: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default MyWorkouts

const styles = StyleSheet.create({
  h1: {
    marginTop: 15,
    marginBottom: 15,
  },
  btn: {
    marginTop: 50,
    marginBottom: 50,
  },
})
