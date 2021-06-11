import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getRoutine,
  completeRoundRest,
  getCurrExercise,
  getCurrTimeEntryElapsedMs,
  hasSound,
} from '_state/reducers/session'
import { StyleSheet } from 'react-native'
import { View, Button, Text } from 'native-base'
import Countdown from '_components/time/Countdown'
import { RoutineExercise } from '_api'
import { secondsToMs } from '_utils/time-utils'

const WorkoutRoundRest = () => {
  const dispatch = useDispatch()
  const elapsedMs = useSelector(getCurrTimeEntryElapsedMs)
  const { rest_seconds } = useSelector(getRoutine)
  const exercise = useSelector(getCurrExercise)
  const sound = useSelector(hasSound)

  const handleComplete = () => {
    dispatch(completeRoundRest())
  }

  return (
    <View style={styles.container}>
      <Button transparent style={styles.btn} onPress={handleComplete}>
        <Countdown
          elapsedMs={elapsedMs}
          targetMs={secondsToMs(rest_seconds)}
          hasSound={sound}
          onCompleted={handleComplete}
        />
        <Text style={styles.btnText}>Tab to skip</Text>
      </Button>
      <Text style={styles.text}>Rest</Text>
      <Text style={styles.exerciseName} numberOfLines={2}>
        Next: {exercise.name} {RoutineExercise.getFormattedRx(exercise)}
      </Text>
    </View>
  )
}

export default WorkoutRoundRest

WorkoutRoundRest.propTypes = {}

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
})
