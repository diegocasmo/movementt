import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Duration from './Duration'
import { msToSeconds } from '_utils/time-utils'
import { Audio } from 'expo-av'
import * as Speech from 'expo-speech'

const silentObject = new Audio.Sound()
silentObject.loadAsync(require('../../../assets/1-second-of-silence.mp3'))

const Countdown = ({
  elapsedMs,
  targetMs,
  onCompleted,
  thresholdMs = 500,
  hasSound = true,
}) => {
  const remainingMs = targetMs - elapsedMs + thresholdMs
  const remainingSeconds = parseInt(msToSeconds(remainingMs))

  useEffect(() => {
    if (elapsedMs > targetMs) {
      onCompleted()
    }
  }, [elapsedMs, targetMs, onCompleted])

  const speakCountdown = async (seconds) => {
    if (seconds > 5 || seconds < 1) return

    Speech.speak(`${seconds}`, {
      onStart: () => {},
      onDone: () => {
        silentObject.replayAsync()
      },
      onStopped: () => {
        silentObject.replayAsync()
      },
      onError: () => {},
    })
  }

  useEffect(() => {
    if (!hasSound) return

    speakCountdown(remainingSeconds)
  }, [remainingSeconds, hasSound])

  return <Duration elapsedMs={remainingMs} />
}

export default Countdown

Countdown.propTypes = {
  elapsedMs: PropTypes.number.isRequired,
  targetMs: PropTypes.number.isRequired,
  onCompleted: PropTypes.func.isRequired,
  thresholdMs: PropTypes.number,
  hasSound: PropTypes.bool,
}
