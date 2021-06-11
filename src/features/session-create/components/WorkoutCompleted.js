import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import {
  getCurrRound,
  getRoutine,
  getTotalElapsedMs,
} from '_state/reducers/session'
import { isCreating } from '_state/reducers/workouts'
import { View, Text, Button, Icon, Spinner } from 'native-base'
import Duration from '_components/time/Duration'

const WorkoutCompleted = ({ onConfirm }) => {
  const currRound = useSelector(getCurrRound)
  const routine = useSelector(getRoutine)
  const elapsedMs = useSelector(getTotalElapsedMs)
  const creating = useSelector(isCreating)

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.topText}>
          Round: {currRound}/{routine.rounds}
        </Text>
      </View>
      <View style={styles.middleContainer}>
        <Button
          transparent
          disabled={creating}
          style={styles.checkBtn}
          onPress={onConfirm}
        >
          {creating ? (
            <Spinner color="black" size="large" />
          ) : (
            <Icon style={styles.checkIcon} active name="md-checkmark" />
          )}
        </Button>
        <Text style={styles.routineName} numberOfLines={2}>
          {routine.name}
        </Text>
        <Duration style={styles.duration} elapsedMs={elapsedMs} />
        <Button
          success
          style={styles.saveBtn}
          disabled={creating}
          onPress={onConfirm}
        >
          {creating ? (
            <Spinner color="white" size="small" />
          ) : (
            <Text>Save Workout</Text>
          )}
        </Button>
      </View>
      <View style={styles.middleContainer}></View>
    </View>
  )
}

export default WorkoutCompleted

WorkoutCompleted.propTypes = {
  onConfirm: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  topContainer: {
    position: 'relative',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  topText: {
    textAlign: 'center',
    fontSize: 38,
  },
  topBtn: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  topIcon: {
    fontSize: 36,
    color: 'black',
    fontWeight: 'bold',
  },
  middleContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkBtn: {
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
  checkIcon: {
    color: 'black',
    fontSize: 156,
  },
  routineName: {
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 38,
  },
  duration: {
    marginTop: 10,
    fontSize: 42,
  },
  saveBtn: {
    marginTop: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
