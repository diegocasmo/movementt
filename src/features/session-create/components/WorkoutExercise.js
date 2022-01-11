import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getCurrExercise,
  getCurrTimeEntryElapsedMs,
  completeExercise,
  hasSound,
} from '_state/reducers/session'
import { StyleSheet } from 'react-native'
import { View, Button, Text } from 'native-base'
import { CountdownButton } from '_components/time/CountdownButton'
import RoutineExerciseInstructions from './RoutineExerciseInstructions'
import { RoutineExercise } from '_api'

const WorkoutExercise = () => {
  const dispatch = useDispatch()
  const exercise = useSelector(getCurrExercise)
  const elapsedMs = useSelector(getCurrTimeEntryElapsedMs)
  const sound = useSelector(hasSound)

  const handleCompleted = () => {
    dispatch(completeExercise())
  }

  return (
    <View style={styles.container}>
      {RoutineExercise.isCategoryTypeTime(exercise) ? (
        <CountdownButton
          elapsedMs={elapsedMs}
          hasSound={sound}
          onCompleted={handleCompleted}
          targetMs={exercise.quantity}
        />
      ) : (
        <Button transparent style={styles.btn} onPress={handleCompleted}>
          <Text style={styles.btnText}>Done</Text>
        </Button>
      )}
      <RoutineExerciseInstructions exercise={exercise} />
    </View>
  )
}

export default WorkoutExercise

WorkoutExercise.propTypes = {}

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
    fontWeight: 'bold',
    fontSize: 52,
  },
})
