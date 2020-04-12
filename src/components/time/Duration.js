import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { Text, View } from 'native-base'
import moment from 'moment'

const Duration = ({ elapsedMs, style }) => {
  const duration = moment.duration(elapsedMs, 'milliseconds')
  const hours = moment.duration(duration).hours()
  const minutes = moment.duration(duration).minutes()
  const seconds = moment.duration(duration).seconds()
  const zeroPad = (x) => (x > 9 ? x : `0${x}`)
  return (
    <View style={styles.container}>
      <Text style={[styles.text, style]}>{zeroPad(hours)}:</Text>
      <Text style={[styles.text, style]}>{zeroPad(minutes)}:</Text>
      <Text style={[styles.text, style]}>{zeroPad(seconds)}</Text>
    </View>
  )
}

export default Duration

Duration.propTypes = {
  elapsedMs: PropTypes.number.isRequired,
  style: PropTypes.object,
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
