import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getPrevExercise,
  getCurrExercise,
  getCurrTimeEntryElapsedMs,
  completeExerciseRest,
  hasSound,
} from '../reducers/create-workout'
import { StyleSheet } from 'react-native'
import { View, Button, Text } from 'native-base'
import Countdown from '_components/time/Countdown'
import { getExerciseFormattedRx } from '_api/exercise'
import { secondsToMs } from '_utils/time-utils'

const WorkoutExerciseRest = () => {
  const dispatch = useDispatch()
  const elapsedMs = useSelector(getCurrTimeEntryElapsedMs)
  const exercise = useSelector(getCurrExercise)
  const { restSeconds } = useSelector(getPrevExercise)
  const sound = useSelector(hasSound)

  const handleComplete = () => {
    dispatch(completeExerciseRest())
  }

  return (
    <View style={styles.container}>
      <Button transparent style={styles.btn} onPress={handleComplete}>
        <Countdown
          elapsedMs={elapsedMs}
          targetMs={secondsToMs(restSeconds)}
          hasSound={sound}
          onCompleted={handleComplete}
        />
        <Text style={styles.btnText}>Tab to skip</Text>
      </Button>
      <Text style={styles.text}>Rest</Text>
      <Text style={styles.exerciseName} numberOfLines={2}>
        Next: {exercise.name} {getExerciseFormattedRx(exercise)}
      </Text>
    </View>
  )
}

export default WorkoutExerciseRest

WorkoutExerciseRest.propTypes = {}

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
