import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import {
  TIME_ENTRY_TYPE,
  getCurrTimeEntry,
  getDoneAt,
  getStartedAt,
  getTotalElapsedMs,
  hasStarted,
  init,
  isCompleted,
  resetWorkout,
  start,
} from '../reducers/create-workout'
import { StyleSheet } from 'react-native'
import { Container, Content } from 'native-base'
import TopControls from '../components/TopControls'
import BottomControls from '../components/BottomControls'
import WorkoutExercise from '../components/WorkoutExercise'
import WorkoutExerciseRest from '../components/WorkoutExerciseRest'
import WorkoutRoundRest from '../components/WorkoutRoundRest'
import WorkoutStartup from '../components/WorkoutStartup'
import WorkoutCompleted from '../components/WorkoutCompleted'
import { getRoutine } from '_state/reducers/routines'
import { getUser } from '_state/reducers/auth'
import { createWorkout } from '_state/reducers/workouts'
import { showError } from '_utils/toast'

const CreateWorkoutScreen = ({ navigation, route }) => {
  const routine = useSelector((state) =>
    getRoutine(state, route.params.routineKey)
  )
  const dispatch = useDispatch()
  const started = useSelector(hasStarted)
  const completed = useSelector(isCompleted)
  const timeEntry = useSelector(getCurrTimeEntry)
  const user = useSelector(getUser)
  const elapsedMs = useSelector(getTotalElapsedMs)
  const startedAt = useSelector(getStartedAt)
  const doneAt = useSelector(getDoneAt)

  const handleStartupCompleted = () => {
    dispatch(init(routine))
    dispatch(start())
  }

  const handleQuit = () => {
    dispatch(resetWorkout())
    navigation.navigate('Home')
  }

  const handleCompleteConfirmed = async () => {
    try {
      const workout = {
        startedAt,
        doneAt,
        elapsedMs,
        routine,
        uid: user.uid,
      }
      const action = await dispatch(createWorkout(workout))
      unwrapResult(action)
      dispatch(resetWorkout())
      navigation.navigate('Home')
    } catch (err) {
      showError(err.message)
    }
  }

  const renderTimeEntry = () => {
    switch (timeEntry.type) {
      case TIME_ENTRY_TYPE.EXERCISE_REST:
        return <WorkoutExerciseRest />
      case TIME_ENTRY_TYPE.ROUND_REST:
        return <WorkoutRoundRest />
      default:
        return <WorkoutExercise />
    }
  }

  if (completed) {
    return (
      <Container>
        <Content padder contentContainerStyle={styles.content}>
          <WorkoutCompleted onConfirm={handleCompleteConfirmed} />
        </Content>
      </Container>
    )
  }

  return (
    <Container>
      {started ? (
        <Content
          padder
          scrollEnabled={false}
          contentContainerStyle={styles.content}
        >
          <TopControls onQuit={handleQuit} />
          {renderTimeEntry()}
          <BottomControls />
        </Content>
      ) : (
        <Content
          padder
          scrollEnabled={false}
          contentContainerStyle={styles.content}
        >
          <WorkoutStartup
            routine={routine}
            onQuit={handleQuit}
            onStartupCompleted={handleStartupCompleted}
          />
        </Content>
      )}
    </Container>
  )
}

export default CreateWorkoutScreen

CreateWorkoutScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      routineKey: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
