import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { Text, View } from 'native-base'
import { getDuration } from '_utils/time-utils'

const Duration = ({ elapsedMs, style }) => {
  const { hours, minutes, seconds } = getDuration(elapsedMs)
  const zeroPad = (x) => (x > 9 ? x : `0${x}`)

  // Hours of duration
  if (hours > 0) {
    return (
      <View style={styles.container}>
        <Text style={[styles.text, style]}>
          {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
        </Text>
      </View>
    )
  }

  // Minutes of duration
  if (minutes > 0) {
    return (
      <View style={styles.container}>
        <Text style={[styles.text, style]}>
          {minutes}:{zeroPad(seconds)} min
        </Text>
      </View>
    )
  }

  // Seconds of duration
  return (
    <View style={styles.container}>
      <Text style={[styles.text, style]}>{seconds} s</Text>
    </View>
  )
}

export default Duration

Duration.defaultProps = {
  style: {},
}

Duration.propTypes = {
  elapsedMs: PropTypes.number.isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
}

const styles = StyleSheet.create({
  container: {},
  text: {
    fontWeight: 'bold',
    fontSize: 52,
  },
})
