import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import {
  getCurrExercise,
  getCurrTimeEntry,
  getCurrTimeEntryElapsedMs,
  getPrevExercise,
  getRoutine,
  hasSound,
  isRunning,
} from '_state/reducers/session'
import { StyleSheet } from 'react-native'
import { View, Text } from 'native-base'
import { CountdownButton } from '_components/time/CountdownButton'
import ExerciseRx from '_components/ExerciseRx'
import { TimeEntry } from '_api'

export const CountdownRest = ({ onComplete }) => {
  const sound = useSelector(hasSound)
  const exercise = useSelector(getCurrExercise)
  const timeEntry = useSelector(getCurrTimeEntry)
  const elapsedMs = useSelector(getCurrTimeEntryElapsedMs)
  const running = useSelector(isRunning)

  // Rest ms configuration based on exercise/round rest
  const { rest_ms: prevExerciseRestMs = 0 } = useSelector(getPrevExercise)
  const { rest_ms: roundRestMs = 0 } = useSelector(getRoutine)

  const restMs =
    timeEntry.type === TimeEntry.TYPE_EXERCISE_REST
      ? prevExerciseRestMs
      : roundRestMs

  return (
    <View style={styles.container}>
      <CountdownButton
        isPlaying={running}
        elapsedMs={elapsedMs}
        hasSound={sound}
        onCompleted={onComplete}
        onPress={onComplete}
        targetMs={restMs}
      >
        <Text style={styles.btnText}>Tab to skip</Text>
      </CountdownButton>
      <Text style={styles.text}>Rest</Text>
      <View style={styles.exerciseNameContainer}>
        <Text style={styles.exerciseName} numberOfLines={2}>
          Next: {exercise.name}&nbsp;
        </Text>
        <ExerciseRx textStyle={styles.exerciseRx} exercise={exercise} />
      </View>
    </View>
  )
}

CountdownRest.propTypes = {
  onComplete: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: 'black',
    fontSize: 18,
  },
  text: {
    marginTop: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 38,
  },
  exerciseNameContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  exerciseName: {
    textAlign: 'center',
    fontSize: 28,
  },
  exerciseRx: {
    marginTop: 5,
    fontSize: 28,
  },
})
