import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Alert } from 'react-native'
import { CountdownButton } from '_components/time/CountdownButton'
import { useInterval } from '_hooks/use-interval'
import { View, Text } from 'native-base'
import { Button, Icon } from '_components/ui'
import { now, getTotalEllapsedMs } from '_utils/time-utils'
import ExerciseRx from '_components/ExerciseRx'

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
      <Button
        colorScheme="transparent"
        style={styles.btnClose}
        onPress={handleQuit}
      >
        <Icon style={styles.icon} name="md-close" />
      </Button>
      <CountdownButton
        elapsedMs={state.elapsedMs}
        isPlaying={!!state.startAt}
        showCountdown={!!state.startAt}
        key={state.startAt}
        onCompleted={onStartupCompleted}
        onPress={handleToggleStartAt}
        targetMs={10000}
      >
        {state.startAt ? (
          <Text style={styles.countdownText}>Tab to pause</Text>
        ) : (
          <Text style={styles.countdownText}>Tab to resume</Text>
        )}
      </CountdownButton>
      <Text style={styles.routineName} numberOfLines={2}>
        {name}
      </Text>

      <View style={styles.exerciseNameContainer}>
        <Text style={styles.exerciseName} numberOfLines={2}>
          Next: {exercises[0].name}&nbsp;
        </Text>
        <ExerciseRx textStyle={styles.exerciseRx} exercise={exercises[0]} />
      </View>
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
  exerciseNameContainer: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center',
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
