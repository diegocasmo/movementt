import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getCurrExercise,
  getCurrTimeEntryElapsedMs,
  completeExercise,
  hasSound,
} from '../reducers/new-session'
import { StyleSheet } from 'react-native'
import { View, Button, Text } from 'native-base'
import Countdown from '../../../components/time/Countdown'
import ExerciseInstructions from './ExerciseInstructions'

const SessionExercise = () => {
  const dispatch = useDispatch()
  const exercise = useSelector(getCurrExercise)
  const elapsedMs = useSelector(getCurrTimeEntryElapsedMs)
  const sound = useSelector(hasSound)

  const handleCompleted = () => {
    dispatch(completeExercise())
  }

  return (
    <View style={styles.container}>
      {exercise.type === 'time' ? (
        <View transparent style={styles.btn}>
          <Countdown
            elapsedMs={elapsedMs}
            targetMs={exercise.quantity}
            hasSound={sound}
            onCompleted={handleCompleted}
          />
        </View>
      ) : (
        <Button transparent style={styles.btn} onPress={handleCompleted}>
          <Text style={styles.btnText}>Done</Text>
        </Button>
      )}
      <ExerciseInstructions exercise={exercise} />
    </View>
  )
}

export default SessionExercise

SessionExercise.propTypes = {}

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
  },
  btnText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 52,
  },
})
