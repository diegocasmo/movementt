import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useInterval } from '../../hooks/use-interval'
import Duration from './Duration'
import moment from 'moment'

const Countdown = ({ ms = 10500, startAt, onCompleted }) => {
  const [elapsedMs, setElapsedMs] = useState(0)

  useInterval(() => {
    const duration = moment.duration(moment() - startAt)
    const elapsedMs = moment.duration(duration).asMilliseconds()

    if (elapsedMs > ms) {
      onCompleted()
    } else {
      setElapsedMs(elapsedMs)
    }
  }, 1000)

  return <Duration elapsedMs={ms - elapsedMs} />
}

export default Countdown

Countdown.propTypes = {
  ms: PropTypes.number,
  startAt: PropTypes.object,
  onCompleted: PropTypes.func.isRequired,
}
