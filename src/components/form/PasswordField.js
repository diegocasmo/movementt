import React from 'react'
import PropTypes from 'prop-types'

import { useFormikContext, getIn } from 'formik'

import Input from './Input'

export const PasswordField = ({ label, name, ...rest }) => {
  const formik = useFormikContext()

  return (
    <Input
      label={label}
      autoCapitalize="none"
      secureTextEntry
      autoCorrect={false}
      autoCompleteType="password"
      onBlur={formik.handleBlur(name)}
      onChange={formik.handleChange(name)}
      error={getIn(formik.errors, name)}
      touched={getIn(formik.touched, name)}
      value={getIn(formik.values, name)}
      {...rest}
    />
  )
}

PasswordField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}
