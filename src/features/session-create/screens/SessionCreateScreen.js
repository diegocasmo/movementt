import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import {
  getCurrTimeEntry,
  getCompletedAt,
  getRoundsCompleted,
  getStartedAt,
  getTimeEntries,
  getTotalElapsedMs,
  hasStarted,
  init,
  isCompleted,
  resetSession,
  start,
} from '_state/reducers/session'
import { Workout, TimeEntry } from '_api'
import { StyleSheet } from 'react-native'
import { Container, Content } from 'native-base'
import TopControls from '../components/TopControls'
import BottomControls from '../components/BottomControls'
import WorkoutExercise from '../components/WorkoutExercise'
import WorkoutExerciseRest from '../components/WorkoutExerciseRest'
import WorkoutRoundRest from '../components/WorkoutRoundRest'
import WorkoutStartup from '../components/WorkoutStartup'
import WorkoutCompleted from '../components/WorkoutCompleted'
import { showError } from '_utils/toast'
import { useGetRoutinesQuery } from '_state/services/routine'
import { findRoutineById } from '_state/selectors/routine'
import { useCreateWorkoutMutation } from '_state/services/workout'

const SessionCreateScreen = ({ navigation, route }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [createWorkout] = useCreateWorkoutMutation()
  const { routine } = useGetRoutinesQuery(undefined, {
    selectFromResult: ({ data }) => ({
      routine: findRoutineById(data, route.params.routineId),
    }),
  })

  const dispatch = useDispatch()
  const started = useSelector(hasStarted)
  const completed = useSelector(isCompleted)
  const timeEntry = useSelector(getCurrTimeEntry)
  const elapsedMs = useSelector(getTotalElapsedMs)
  const startedAt = useSelector(getStartedAt)
  const completedAt = useSelector(getCompletedAt)
  const roundsCompleted = useSelector(getRoundsCompleted)
  const timeEntries = useSelector(getTimeEntries)

  const handleStartupCompleted = () => {
    dispatch(init(routine))
    dispatch(start())
  }

  const handleQuit = () => {
    dispatch(resetSession())
    navigation.navigate('Home')
  }

  const handleCompleteConfirmed = async () => {
    setIsSubmitting(true)

    const session = {
      completedAt,
      elapsedMs,
      roundsCompleted,
      routine,
      startedAt,
      timeEntries,
    }

    try {
      const workout = await Workout.build(session)
      await createWorkout(workout).unwrap()
      dispatch(resetSession())
      navigation.navigate('Home')
    } catch (err) {
      setIsSubmitting(false)
      showError(err)
    }
  }

  const renderTimeEntry = () => {
    switch (timeEntry.type) {
      case TimeEntry.TYPE_EXERCISE_REST:
        return <WorkoutExerciseRest />
      case TimeEntry.TYPE_ROUND_REST:
        return <WorkoutRoundRest />
      default:
        return <WorkoutExercise />
    }
  }

  if (completed) {
    return (
      <Container>
        <Content padder contentContainerStyle={styles.content}>
          <WorkoutCompleted
            onConfirm={handleCompleteConfirmed}
            isLoading={isSubmitting}
          />
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

export default SessionCreateScreen

SessionCreateScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      routineId: PropTypes.number.isRequired,
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
