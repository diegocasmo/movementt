import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Alert } from 'react-native'
import Countdown from '_components/time/Countdown'
import { useInterval } from '_hooks/use-interval'
import { getExerciseFormattedRx } from '_api/exercise'
import { View, Button, Text, Icon } from 'native-base'
import { now, getTotalEllapsedMs } from '_utils/time-utils'

const WorkoutStartup = ({ routine, onStartupCompleted, onQuit }) => {
  const { name, exercises } = routine
  const [state, setState] = useState({ startAt: now(), elapsedMs: 0 })
  const stop = () => {
    setState({ startAt: null, elapsedMs: 0 })
  }
  const start = () => {
    setState({ startAt: now(), elapsedMs: 0 })
  }

  const handleToggleStartAt = () => {
    if (state.startAt) {
      stop()
    } else {
      start()
    }
  }

  useInterval(() => {
    setState({
      ...state,
      elapsedMs: getTotalEllapsedMs(now(), state.startAt),
    })
  }, 1000)

  const handleQuit = () => {
    stop()

    Alert.alert(
      'Quit Routine',
      'Are you sure you want to quit the routine?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            onQuit()
          },
        },
      ],
      { cancelable: false }
    )
  }

  return (
    <View style={styles.container}>
      <Button style={styles.btnClose} transparent onPress={handleQuit}>
        <Icon style={styles.icon} active name="md-close" />
      </Button>
      <Button
        transparent
        style={styles.countdownBtn}
        onPress={handleToggleStartAt}
      >
        {state.startAt && (
          <Countdown
            elapsedMs={state.elapsedMs}
            targetMs={10000}
            onCompleted={onStartupCompleted}
          />
        )}
        {state.startAt ? (
          <Text style={styles.countdownText}>Tab to pause</Text>
        ) : (
          <Text style={styles.countdownText}>Tab to resume</Text>
        )}
      </Button>
      <Text style={styles.routineName} numberOfLines={2}>
        {name}
      </Text>
      <Text style={styles.exerciseName} numberOfLines={2}>
        Next: {exercises[0].name} {getExerciseFormattedRx(exercises[0])}
      </Text>
    </View>
  )
}

export default WorkoutStartup

WorkoutStartup.propTypes = {
  routine: PropTypes.object.isRequired,
  onStartupCompleted: PropTypes.func.isRequired,
  onQuit: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: '100%',
  },
  btnClose: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  icon: {
    fontSize: 36,
    color: 'black',
    fontWeight: 'bold',
  },
  countdownBtn: {
    width: 300,
    height: 300,
    borderRadius: 300,
    borderColor: 'black',
    borderWidth: 3,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  countdownText: {
    color: 'black',
    fontSize: 18,
  },
  routineName: {
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
