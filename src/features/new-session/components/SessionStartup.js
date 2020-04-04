import React from 'react'
import PropTypes from 'prop-types'
import Countdown from '../../../components/time/Countdown'

const SessionStartup = ({ finishAt, onSessionStartupCompleted }) => {
  return (
    <Countdown
      finishAt={finishAt}
      onCountdownCompleted={onSessionStartupCompleted}
    />
  )
}

export default SessionStartup

SessionStartup.propTypes = {
  finishAt: PropTypes.object.isRequired,
  onSessionStartupCompleted: PropTypes.func.isRequired,
}
