import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import Countdown from '../../../components/time/Countdown'
import { useInterval } from '../../../hooks/use-interval'
import { View, Button, Text } from 'native-base'
import moment from 'moment'

const SessionStartup = ({ workout, onStartupCompleted }) => {
  const { name, exercises } = workout
  const [state, setState] = useState({ startAt: moment(), elapsedMs: 0 })

  const handleToggleStartAt = () => {
    if (state.startAt) {
      setState({ startAt: null, elapsedMs: 0 })
    } else {
      setState({ startAt: moment(), elapsedMs: 0 })
    }
  }

  useInterval(() => {
    const duration = moment.duration(moment() - state.startAt)
    const elapsedMs = moment.duration(duration).asMilliseconds()
    setState({ ...state, elapsedMs })
  }, 1000)

  return (
    <View style={styles.container}>
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
      <Text style={styles.workoutName} numberOfLines={2}>
        {name}
      </Text>
      <Text style={styles.exerciseName} numberOfLines={2}>
        Next: {exercises[0].name}
      </Text>
    </View>
  )
}

export default SessionStartup

SessionStartup.propTypes = {
  workout: PropTypes.object.isRequired,
  onStartupCompleted: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  workoutName: {
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
