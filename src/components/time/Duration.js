import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { Text, View } from 'native-base'
import moment from 'moment'

const Duration = ({ start, stop }) => {
  const elapsedMs = moment.duration(stop - start, 'milliseconds')
  const hours = moment.duration(elapsedMs).hours()
  const minutes = moment.duration(elapsedMs).minutes()
  const seconds = moment.duration(elapsedMs).seconds()
  const zeroPad = (x) => (x > 9 ? x : `0${x}`)
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{zeroPad(hours)}:</Text>
      <Text style={styles.text}>{zeroPad(minutes)}:</Text>
      <Text style={styles.text}>{zeroPad(seconds)}</Text>
    </View>
  )
}

export default Duration

Duration.propTypes = {
  start: PropTypes.object.isRequired,
  stop: PropTypes.object.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 52,
  },
})
