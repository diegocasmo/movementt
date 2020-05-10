import React from 'react'
import Input from './Input'

const EmailInput = ({ ...rest }) => {
  return <Input autoCapitalize="none" keyboardType="email-address" {...rest} />
}

export default EmailInput
