import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { Button as NativeBaseButton, Text, Spinner } from 'native-base'

const transformPropToBoolean = (k) => (k ? { [k]: true } : {})

export const Button = ({
  children,
  colorScheme,
  icon,
  isDisabled,
  isLoading,
  isText,
  onPress,
  size,
  style,
  styleSpinner,
  styleText,
  variant,
}) => {
  return (
    <NativeBaseButton
      {...transformPropToBoolean(size)}
      {...transformPropToBoolean(colorScheme)}
      {...transformPropToBoolean(variant)}
      disabled={isLoading || isDisabled}
      onPress={onPress}
      style={style}
    >
      {isLoading && (
        <Spinner
          style={[styles.spinner, styleSpinner]}
          color="white"
          size="small"
        />
      )}
      {icon}
      {children &&
        (isText ? <Text style={styleText}>{children}</Text> : children)}
    </NativeBaseButton>
  )
}

Button.defaultProps = {
  colorScheme: 'primary',
  isDisabled: false,
  isLoading: false,
  isText: true,
}

Button.propTypes = {
  children: PropTypes.node,
  colorScheme: PropTypes.oneOf([
    'danger',
    'light',
    'primary',
    'success',
    'transparent',
  ]),
  icon: PropTypes.node,
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  isText: PropTypes.bool,
  onPress: PropTypes.func,
  size: PropTypes.oneOf(['small']),
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleSpinner: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleText: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  variant: PropTypes.oneOf(['block']),
}

const styles = StyleSheet.create({
  spinner: {
    marginRight: -10,
  },
})
