import React from 'react'
import PropTypes from 'prop-types'

import { useFormikContext, getIn } from 'formik'

import Input from './Input'

export const TextField = ({ label, name, ...rest }) => {
  const formik = useFormikContext()

  return (
    <Input
      label={label}
      error={getIn(formik.errors, name)}
      onBlur={formik.handleBlur(name)}
      onChange={formik.handleChange(name)}
      touched={getIn(formik.touched, name)}
      value={getIn(formik.values, name)}
      {...rest}
    />
  )
}

TextField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}
