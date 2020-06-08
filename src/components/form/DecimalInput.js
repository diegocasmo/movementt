import React from 'react'
import PropTypes from 'prop-types'
import Input from './Input'

const DecimalInput = ({ value, onChange, ...rest }) => {
  const handleChange = (value) => {
    onChange(value.replace(',', '.'))
  }

  return (
    <Input
      keyboardType="decimal-pad"
      onChange={handleChange}
      value={`${value}`}
      {...rest}
    />
  )
}

DecimalInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
}

export default DecimalInput
