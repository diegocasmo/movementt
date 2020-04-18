import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getPrevExercise,
  getCurrExercise,
  getCurrTimeEntryElapsedMs,
  completeExerciseRest,
} from '../reducers/new-session'
import { StyleSheet } from 'react-native'
import { View, Button, Text } from 'native-base'
import Countdown from '../../../components/time/Countdown'

const SessionExerciseRest = () => {
  const dispatch = useDispatch()
  const elapsedMs = useSelector(getCurrTimeEntryElapsedMs)
  const { name } = useSelector(getCurrExercise)
  const { restMs } = useSelector(getPrevExercise)

  const handleComplete = () => {
    dispatch(completeExerciseRest())
  }

  return (
    <View style={styles.container}>
      <Button transparent style={styles.btn} onPress={handleComplete}>
        <Countdown
          elapsedMs={elapsedMs}
          targetMs={restMs}
          onCompleted={handleComplete}
        />
        <Text style={styles.btnText}>Tab to skip</Text>
      </Button>
      <Text style={styles.text}>Rest</Text>
      <Text style={styles.exerciseName} numberOfLines={2}>
        Next: {name}
      </Text>
    </View>
  )
}

export default SessionExerciseRest

SessionExerciseRest.propTypes = {}

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
