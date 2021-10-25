import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'

export const Layout = ({ children }) => (
  <View style={styles.container}>{children}</View>
)

Layout.propTypes = {
  children: PropTypes.node,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 20,
    paddingBottom: 20,
  },
})
