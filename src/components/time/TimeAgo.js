import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { timestamp, fromNow, MS_IN_A_MIN } from '_utils/time-utils'
import { Text } from 'native-base'
import { useInterval } from '_hooks/use-interval'

export const TimeAgo = ({
  from,
  to = timestamp(),
  delayInMs = MS_IN_A_MIN,
  ...props
}) => {
  const [now, setNow] = useState(to)

  useInterval(() => {
    setNow(timestamp())
  }, delayInMs)

  return <Text {...props}>{fromNow(from, now)}</Text>
}

TimeAgo.propTypes = {
  delayInMs: PropTypes.number,
  from: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}
