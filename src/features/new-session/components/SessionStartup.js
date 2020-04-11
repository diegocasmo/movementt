import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import Countdown from '../../../components/time/Countdown'
import { View, Button, Text } from 'native-base'
import moment from 'moment'

const SessionStartup = ({ workout, onStartupCompleted }) => {
  const { name, exercises } = workout
  const [startAt, setStartAt] = useState(moment())

  const handleToggleStartAt = () => {
    if (startAt) {
      setStartAt(null)
    } else {
      setStartAt(moment())
    }
  }

  const renderCountdown = () => {
    if (startAt) {
      return (
        <Button
          transparent
          style={styles.countdownBtn}
          onPress={handleToggleStartAt}
        >
          <Countdown startAt={startAt} onCompleted={onStartupCompleted} />
          <Text style={styles.countdownText}>Tab to pause</Text>
        </Button>
      )
    } else {
      return (
        <Button
          transparent
          style={styles.countdownBtn}
          onPress={handleToggleStartAt}
        >
          <Text style={styles.countdownText}>Tab to resume</Text>
        </Button>
      )
    }
  }

  return (
    <View style={styles.container}>
      {renderCountdown()}
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
    marginTop: 40,
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
