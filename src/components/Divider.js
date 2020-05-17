import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { View, Text } from 'native-base'

const Divider = ({ children }) => {
  return (
    <View style={styles.container}>
      <View style={styles.left} />
      <Text style={styles.children}>{children}</Text>
      <View style={styles.right} />
    </View>
  )
}

Divider.propTypes = {
  children: PropTypes.node,
}

export default Divider

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginBottom: 15,
    flexDirection: 'row',
  },
  left: {
    backgroundColor: 'black',
    height: 1,
    flex: 1,
    alignSelf: 'center',
  },
  children: {
    alignSelf: 'center',
    paddingHorizontal: 5,
    fontSize: 24,
  },
  right: {
    backgroundColor: 'black',
    height: 1,
    flex: 1,
    alignSelf: 'center',
  },
})
