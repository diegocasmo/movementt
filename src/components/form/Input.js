import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { Input as NBInput, Item, Label } from 'native-base'

const Input = ({
  error,
  label,
  onBlur,
  onChange,
  style,
  touched,
  value,
  ...rest
}) => {
  return (
    <Item
      stackedLabel
      style={[styles.container, style]}
      error={touched && error ? true : false}
    >
      <Label style={styles.label}>{label}</Label>
      <NBInput
        style={styles.input}
        onChangeText={onChange}
        onBlur={onBlur}
        value={value}
        {...rest}
      />
    </Item>
  )
}

Input.propTypes = {
  error: PropTypes.string,
  label: PropTypes.string.isRequired,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  style: PropTypes.object,
  touched: PropTypes.bool,
  value: PropTypes.string,
}

const styles = StyleSheet.create({
  container: {},
  label: {},
  input: {
    height: 12,
  },
})

export default Input
