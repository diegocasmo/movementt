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
  onPress,
  style,
  variant,
}) => (
  <NativeBaseButton
    {...transformPropToBoolean(colorScheme)}
    {...transformPropToBoolean(variant)}
    style={style}
    onPress={onPress}
    disabled={isLoading || isDisabled}
  >
    {isLoading && <Spinner style={styles.spinner} color="white" size="small" />}
    {icon}
    {children && <Text>{children}</Text>}
  </NativeBaseButton>
)

Button.defaultProps = {
  colorScheme: 'primary',
  isDisabled: false,
  isLoading: false,
}

Button.propTypes = {
  children: PropTypes.node,
  colorScheme: PropTypes.oneOf(['primary', 'transparent', 'danger', 'light']),
  icon: PropTypes.node,
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  onPress: PropTypes.func,
  style: PropTypes.object,
  variant: PropTypes.oneOf(['block']),
}

const styles = StyleSheet.create({
  spinner: {
    marginRight: -10,
  },
})
