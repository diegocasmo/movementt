import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useInterval } from '../../hooks/use-interval'
import Duration from './Duration'
import moment from 'moment'

const Countdown = ({
  finishAt,
  onCountdownCompleted,
  extraThreshold = 0.5,
}) => {
  // Add a few additional seconds to avoid skipping the countdown start
  finishAt = moment(finishAt).add(extraThreshold, 'seconds')
  const [now, setNow] = useState(moment())

  useInterval(() => {
    const nextNow = moment()
    if (nextNow.isAfter(finishAt)) {
      onCountdownCompleted()
    } else {
      setNow(nextNow)
    }
  }, 1000)

  return <Duration start={now} stop={finishAt} />
}

export default Countdown

Countdown.propTypes = {
  finishAt: PropTypes.object.isRequired,
  onCountdownCompleted: PropTypes.func.isRequired,
  extraThreshold: PropTypes.number,
}
