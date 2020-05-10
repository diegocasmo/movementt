import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Duration from './Duration'
import * as Speech from 'expo-speech'

const Countdown = ({
  elapsedMs,
  targetMs,
  onCompleted,
  thresholdMs = 500,
  hasSound = true,
}) => {
  const remainingMs = targetMs - elapsedMs + thresholdMs
  const remainingSeconds = parseInt(remainingMs / 1000)

  useEffect(() => {
    if (elapsedMs >= targetMs) {
      onCompleted()
    }
  }, [elapsedMs])

  useEffect(() => {
    if (!hasSound) return

    if (remainingSeconds < 6 && remainingSeconds > 0) {
      Speech.speak(`${remainingSeconds}`)
    }
  }, [remainingSeconds])

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
