import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import { Button, View, Text, H1 } from 'native-base'
import { getRoutines } from '_state/reducers/routines'
import RoutineItem from './RoutineItem'

const MyRoutines = ({ onCreateRoutine, onStart, onUpdate, onDelete }) => {
  const routines = useSelector(getRoutines)

  return (
    <View>
      <H1 style={styles.h1}>My Routines ({routines.length})</H1>
      {routines.length === 0 ? (
        <Button block primary style={styles.btn} onPress={onCreateRoutine}>
          <Text>Create routine</Text>
        </Button>
      ) : (
        routines.map((routine) => (
          <RoutineItem
            key={routine.key}
            routine={routine}
            onStart={onStart}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))
      )}
    </View>
  )
}

MyRoutines.propTypes = {
  onCreateRoutine: PropTypes.func.isRequired,
  onStart: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default MyRoutines

const styles = StyleSheet.create({
  h1: {
    marginTop: 15,
    marginBottom: 15,
  },
  btn: {
    marginTop: 50,
    marginBottom: 50,
  },
})
