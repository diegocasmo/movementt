import React from 'react'
import PropTypes from 'prop-types'

import { useFormikContext, getIn } from 'formik'

import Input from './Input'

export const IntegerField = ({ label, name, ...rest }) => {
  const formik = useFormikContext()

  return (
    <Input
      keyboardType="number-pad"
      label={label}
      value={`${getIn(formik.values, name)}`}
      error={getIn(formik.errors, name)}
      onBlur={formik.handleBlur(name)}
      onChange={formik.handleChange(name)}
      touched={getIn(formik.touched, name)}
      {...rest}
    />
  )
}

IntegerField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}
