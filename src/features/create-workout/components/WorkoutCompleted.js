import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import {
  getCurrRound,
  getRoutine,
  getTotalElapsedMs,
} from '../reducers/create-workout'
import { View, Text, Button, Icon } from 'native-base'
import Duration from '_components/time/Duration'

const WorkoutCompleted = ({ onConfirm }) => {
  const currRound = useSelector(getCurrRound)
  const routine = useSelector(getRoutine)
  const elapsedMs = useSelector(getTotalElapsedMs)

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.topText}>
          Round: {currRound}/{routine.rounds}
        </Text>
        <Button style={styles.topBtn} transparent onPress={onConfirm}>
          <Icon style={styles.topIcon} active name="md-close" />
        </Button>
      </View>
      <View style={styles.middleContainer}>
        <Button transparent style={styles.checkBtn} onPress={onConfirm}>
          <Icon style={styles.checkIcon} active name="md-checkmark" />
        </Button>
        <Text style={styles.routineName} numberOfLines={2}>
          {routine.name}
        </Text>
        <Duration style={styles.duration} elapsedMs={elapsedMs} />
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
})
