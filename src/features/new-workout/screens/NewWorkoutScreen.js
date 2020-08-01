import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import {
  init,
  resetWorkout,
  start,
  hasStarted,
  isCompleted,
  getCurrTimeEntry,
  TIME_ENTRY_TYPE,
} from '../reducers/new-workout'
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

const NewWorkoutScreen = ({ navigation, route }) => {
  const routine = useSelector((state) =>
    getRoutine(state, route.params.routineKey)
  )
  const dispatch = useDispatch()
  const started = useSelector(hasStarted)
  const completed = useSelector(isCompleted)
  const timeEntry = useSelector(getCurrTimeEntry)

  const handleStartupCompleted = () => {
    dispatch(init(routine))
    dispatch(start())
  }

  const handleQuit = () => {
    dispatch(resetWorkout())
    navigation.navigate('Home')
  }

  const handleCompleteConfirmed = () => {
    dispatch(resetWorkout())
    navigation.navigate('Home')
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

export default NewWorkoutScreen

NewWorkoutScreen.propTypes = {
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
