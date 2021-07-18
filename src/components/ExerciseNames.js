import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'native-base'

const formatter = new Intl.ListFormat('en', {
  style: 'long',
  type: 'conjunction',
})

export const ExerciseNames = ({ exercises, ...rest }) => {
  const names = exercises.map((ex) => ex.name)

  return <Text {...rest}>{formatter.format(names)}</Text>
}

ExerciseNames.propTypes = {
  exercises: PropTypes.array.isRequired,
}
