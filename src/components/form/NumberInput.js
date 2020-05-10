import React from 'react'
import PropTypes from 'prop-types'
import Input from './Input'

const NumberInput = ({ value, ...rest }) => {
  return <Input keyboardType="number-pad" value={`${value}`} {...rest} />
}

NumberInput.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
}

export default NumberInput
