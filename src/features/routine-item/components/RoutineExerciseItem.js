import React from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { Text, Card, CardItem, Body } from 'native-base'
import { RoutineExercise } from '_api'
import { getFormattedDuration } from '_utils/time-utils'
import ExerciseIcon from '_components/ExerciseIcon'

const RoutineExerciseItem = ({ exercise }) => {
  return (
    <Card style={styles.card}>
      <CardItem header style={styles.header}>
        <ExerciseIcon exercise={exercise} />
        <Text numberOfLines={1}>{exercise.name}</Text>
      </CardItem>
      <CardItem>
        <Body style={styles.body}>
          <Text>{RoutineExercise.getFormattedRx(exercise)}</Text>
          <Text>Rest: {getFormattedDuration(exercise.rest_seconds)}</Text>
        </Body>
      </CardItem>
    </Card>
  )
}

RoutineExerciseItem.propTypes = {
  exercise: PropTypes.object.isRequired,
}

export default RoutineExerciseItem

const styles = StyleSheet.create({
  card: {},
  header: {
    paddingBottom: 0,
  },
  body: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
})