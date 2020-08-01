import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { View, H1 } from 'native-base'
import RoutineItem from './RoutineItem'
import { routines } from '_seed/routines.json'

const ExampleRoutines = ({ onStart }) => {
  return (
    <View>
      <H1 style={styles.h1}>Example Routines ({routines.length})</H1>
      {routines.map((routine) => (
        <RoutineItem key={routine.key} routine={routine} onStart={onStart} />
      ))}
    </View>
  )
}

ExampleRoutines.propTypes = {
  onStart: PropTypes.func.isRequired,
}

export default ExampleRoutines

const styles = StyleSheet.create({
  h1: {
    marginTop: 15,
    marginBottom: 15,
  },
})
