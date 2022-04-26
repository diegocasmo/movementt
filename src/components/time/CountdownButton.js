import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { View } from 'native-base'
import { Button } from '_components/ui'
import { msToSeconds } from '_utils/time-utils'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import Countdown from '_components/time/Countdown'

export const CountdownButton = ({
  children,
  elapsedMs,
  hasSound,
  isPlaying = true,
  onCompleted,
  onPress = () => {},
  showCountdown = true,
  size = 300,
  targetMs,
  thresholdMs = 500,
}) => {
  return (
    <Button
      colorScheme="transparent"
      style={[styles.btn, { width: size, height: size }]}
      onPress={onPress}
    >
      <CountdownCircleTimer
        colors={['#000']}
        duration={msToSeconds(targetMs + thresholdMs)}
        isPlaying={isPlaying}
        size={size}
      >
        {() => (
          <View style={styles.children}>
            {showCountdown && (
              <Countdown
                elapsedMs={elapsedMs}
                hasSound={hasSound}
                onCompleted={onCompleted}
                targetMs={targetMs}
                thresholdMs={thresholdMs}
              />
            )}
            {children}
          </View>
        )}
      </CountdownCircleTimer>
    </Button>
  )
}

CountdownButton.propTypes = {
  children: PropTypes.node,
  elapsedMs: PropTypes.number.isRequired,
  hasSound: PropTypes.bool,
  isPlaying: PropTypes.bool,
  onCompleted: PropTypes.func.isRequired,
  onPress: PropTypes.func,
  showCountdown: PropTypes.bool,
  size: PropTypes.number,
  targetMs: PropTypes.number.isRequired,
  thresholdMs: PropTypes.number,
}

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  children: {
    alignItems: 'center',
  },
})
