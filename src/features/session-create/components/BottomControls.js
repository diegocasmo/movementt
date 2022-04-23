import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  play,
  stop,
  tick,
  isRunning,
  getTotalElapsedMs,
} from '_state/reducers/session'
import { useInterval } from '_hooks/use-interval'
import { StyleSheet } from 'react-native'
import { View, Icon } from 'native-base'
import { Button } from '_components/ui/Button'
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
        <Button
          colorScheme="transparent"
          style={styles.button}
          onPress={handleStop}
          icon={<Icon style={styles.icon} active name="md-pause" />}
        />
      ) : (
        <Button
          colorScheme="transparent"
          style={styles.button}
          onPress={handlePlay}
          icon={<Icon style={styles.icon} active name="md-play" />}
        />
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
