import React from 'react'
import PropTypes from 'prop-types'
import Input from './Input'

const IntegerInput = ({ value, ...rest }) => {
  return <Input keyboardType="number-pad" value={`${value}`} {...rest} />
}

IntegerInput.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
}

export default IntegerInput
