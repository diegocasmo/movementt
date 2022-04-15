import React from 'react'
import PropTypes from 'prop-types'
import { Button as NativeBaseButton, Text, Spinner } from 'native-base'

const transformPropToBoolean = (k) => ({ [k]: true })

export const Button = ({
  children,
  colorScheme,
  icon,
  isLoading,
  onPress,
  style,
  variant,
}) => (
  <NativeBaseButton
    {...transformPropToBoolean(colorScheme)}
    {...transformPropToBoolean(variant)}
    style={style}
    onPress={onPress}
    disabled={isLoading}
  >
    {isLoading && <Spinner color="white" size="small" />}
    {icon}
    {children && <Text>{children}</Text>}
  </NativeBaseButton>
)

Button.defaultProps = {
  colorScheme: 'primary',
  isLoading: false,
  variant: 'block',
}

Button.propTypes = {
  children: PropTypes.node,
  colorScheme: PropTypes.oneOf(['primary', 'transparent']),
  icon: PropTypes.node,
  isLoading: PropTypes.bool,
  onPress: PropTypes.func,
  style: PropTypes.object,
  variant: PropTypes.oneOf(['block']),
}
