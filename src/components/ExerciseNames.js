import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'native-base'

export const ExerciseNames = ({ exercises, ...rest }) => {
  const names = exercises.map((ex) => ex.name)

  const format = (arr) => {
    if (arr.length === 1) return `${arr[0]}`

    const length = arr.length
    const str = arr.reduce((acc, curr, idx) => {
      if (idx === length - 1) return `${acc}, and ${curr}`
      if (idx === 0) return `${curr}`

      return `${acc}, ${curr}`
    }, '')

    return str
  }

  return <Text {...rest}>{format(names)}</Text>
}

ExerciseNames.propTypes = {
  exercises: PropTypes.array.isRequired,
}
