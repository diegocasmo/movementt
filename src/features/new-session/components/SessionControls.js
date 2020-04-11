import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  play,
  stop,
  tick,
  isRunning,
  getElapsedMs,
} from '../reducers/new-session'
import { useInterval } from '../../../hooks/use-interval'
import { StyleSheet } from 'react-native'
import { View, Button, Icon } from 'native-base'
import Duration from '../../../components/time/Duration'

const SessionControls = () => {
  const dispatch = useDispatch()
  const running = useSelector(isRunning)
  const elapsedMs = useSelector(getElapsedMs)

  useInterval(() => {
    dispatch(tick())
  }, 1000)

  const handlePlay = () => {
    dispatch(play())
  }

  const handleStop = () => {
    dispatch(stop())
  }

  return (
    <View style={styles.container}>
      <Duration style={styles.duration} elapsedMs={elapsedMs} />
      {running ? (
        <Button style={styles.button} transparent onPress={handleStop}>
          <Icon style={styles.icon} active name="md-pause" />
        </Button>
      ) : (
        <Button style={styles.button} transparent onPress={handlePlay}>
          <Icon style={styles.icon} active name="md-play" />
        </Button>
      )}
    </View>
  )
}

export default SessionControls

SessionControls.propTypes = {}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  duration: {
    fontSize: 42,
    width: 70,
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 80,
    borderColor: 'black',
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 28,
    color: 'black',
    fontWeight: 'bold',
  },
})
