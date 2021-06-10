import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  play,
  stop,
  tick,
  isRunning,
  getTotalElapsedMs,
} from '_state/reducers/create-workout'
import { useInterval } from '_hooks/use-interval'
import { StyleSheet } from 'react-native'
import { View, Button, Icon } from 'native-base'
import Duration from '_components/time/Duration'

const BottomControls = () => {
  const dispatch = useDispatch()
  const running = useSelector(isRunning)
  const elapsedMs = useSelector(getTotalElapsedMs)

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

export default BottomControls

BottomControls.propTypes = {}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  duration: {
    fontSize: 42,
  },
  button: {
    width: 80,
    height: 80,
    justifyContent: 'flex-end',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  icon: {
    fontSize: 42,
    color: 'black',
    fontWeight: 'bold',
  },
})
