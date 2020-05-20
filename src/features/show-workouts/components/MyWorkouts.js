import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import { Button, View, Text } from 'native-base'
import { getWorkouts } from '../../../state/reducers/workouts'
import WorkoutItem from './WorkoutItem'
import Divider from '../../../components/Divider'

const MyWorkouts = ({ onCreateWorkout, onStart, onUpdate, onDelete }) => {
  const workouts = useSelector(getWorkouts)

  return (
    <View>
      <Divider>My Workouts ({workouts.length})</Divider>
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
  btn: {
    marginTop: 50,
    marginBottom: 50,
  },
})
