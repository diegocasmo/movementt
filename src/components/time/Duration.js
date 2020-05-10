import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { Text, View } from 'native-base'
import { getDuration } from '../../utils/time-utils'

const Duration = ({ elapsedMs, style }) => {
  const { hours, minutes, seconds } = getDuration(elapsedMs)
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
