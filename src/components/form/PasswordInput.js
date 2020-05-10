import React from 'react'
import Input from './Input'

const PasswordInput = ({ ...rest }) => {
  return (
    <Input
      autoCapitalize="none"
      secureTextEntry
      autoCorrect={false}
      autoCompleteType="password"
      {...rest}
    />
  )
}

export default PasswordInput
