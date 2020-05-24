import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Container, Content, H1, H2, Text, View } from 'native-base'
import ExerciseDetails from '../components/ExerciseDetails'
import Workout from '../../../api/models/Workout'
import WorkoutActions from '../../../components/WorkoutActions'
import { getUser } from '../../../state/reducers/auth'
import { destroyWorkout } from '../../../state/reducers/workouts'
import { showError } from '../../../utils/toast'

const WorkoutItemScreen = ({ navigation, route }) => {
  const dispatch = useDispatch()
  const user = useSelector(getUser)
  const { workout } = route.params

  const handleStart = () => {
    navigation.navigate('NewSession', { workout })
  }

  const handleUpdate = (workout) => {
    navigation.navigate('UpdateWorkout', { workout })
  }

  const handleDelete = async (workout) => {
    try {
      await dispatch(destroyWorkout(user.uid, workout))
      navigation.navigate('Home')
    } catch (err) {
      showError(err.message)
    }
  }

  return (
    <Container>
      <View style={[styles.content, styles.header]}>
        <View>
          <H1 style={styles.h1}>Setup</H1>

          <Text style={styles.workoutDetail}>Name: {workout.name}</Text>
          <Text style={styles.workoutDetail}>Rounds: {workout.rounds}</Text>
          <Text style={styles.workoutDetail}>
            Round rest: {Workout.getFormattedRest(workout)}
          </Text>

          <H2 style={styles.h2}>Exercises ({workout.exercises.length})</H2>
        </View>

        <WorkoutActions
          workout={workout}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      </View>

      <Content
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {workout.exercises.map((exercise, idx) => (
          <ExerciseDetails key={idx} exercise={exercise} />
        ))}
      </Content>

      <View style={[styles.content, styles.footer]}>
        <Button style={styles.startBtn} onPress={handleStart}>
          <Text>Start Workout</Text>
        </Button>
      </View>
    </Container>
  )
}

export default WorkoutItemScreen

WorkoutItemScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      workout: PropTypes.object.isRequired,
    }).isRequired,
  }).isRequired,
}

const styles = StyleSheet.create({
  content: {
    marginLeft: 10,
    marginRight: 10,
  },
  header: {
    marginTop: 10,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  footer: {
    marginBottom: 10,
  },
  h1: {
    marginBottom: 12,
  },
  workoutDetail: {
    marginBottom: 10,
  },
  h2: {
    marginBottom: 12,
  },
  startBtn: {
    justifyContent: 'center',
  },
})
