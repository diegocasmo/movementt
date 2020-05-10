import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { Input as NBInput, Item, Label } from 'native-base'
import isEqual from 'react-fast-compare'

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
      style={[styles.container, style]}
      stackedLabel
      error={touched && error ? true : false}
    >
      <Label>{label}</Label>
      <NBInput
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
  container: {
    marginBottom: 5,
  },
})

export default React.memo(Input, isEqual)
