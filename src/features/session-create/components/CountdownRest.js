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
} from '_state/reducers/session'
import { StyleSheet } from 'react-native'
import { View, Button, Text } from 'native-base'
import Countdown from '_components/time/Countdown'
import { secondsToMs } from '_utils/time-utils'
import ExerciseRx from '_components/ExerciseRx'
import { TimeEntry } from '_api'

export const CountdownRest = ({ onComplete }) => {
  const sound = useSelector(hasSound)
  const exercise = useSelector(getCurrExercise)
  const timeEntry = useSelector(getCurrTimeEntry)
  const elapsedMs = useSelector(getCurrTimeEntryElapsedMs)

  // Rest seconds configuration based on exercise/round rest
  const { rest_seconds: prevExerciseRestSeconds = 0 } =
    useSelector(getPrevExercise)
  const { rest_seconds: roundRestSeconds = 0 } = useSelector(getRoutine)

  const restSeconds =
    timeEntry.type === TimeEntry.TYPE_EXERCISE_REST
      ? prevExerciseRestSeconds
      : roundRestSeconds

  return (
    <View style={styles.container}>
      <Button transparent style={styles.btn} onPress={onComplete}>
        <Countdown
          elapsedMs={elapsedMs}
          targetMs={secondsToMs(restSeconds)}
          hasSound={sound}
          onCompleted={onComplete}
        />
        <Text style={styles.btnText}>Tab to skip</Text>
      </Button>
      <Text style={styles.text}>Rest</Text>
      <Text style={styles.exerciseName} numberOfLines={2}>
        Next: {exercise.name}{' '}
        <ExerciseRx style={styles.exerciseRx} exercise={exercise} />
      </Text>
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
  btn: {
    width: 300,
    height: 300,
    borderRadius: 300,
    borderColor: 'black',
    borderWidth: 3,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
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
  exerciseName: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 28,
  },
  exerciseRx: {
    fontSize: 28,
  },
})
