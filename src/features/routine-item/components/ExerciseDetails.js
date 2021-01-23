import React from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { Text, Card, CardItem, Body } from 'native-base'
import { getExerciseFormattedRx } from '_api/routine-exercise'
import { getFormattedDuration } from '_utils/time-utils'
import ExerciseIcon from '_components/ExerciseIcon'

const ExerciseDetails = ({ exercise }) => {
  return (
    <Card style={styles.card}>
      <CardItem header style={styles.header}>
        <ExerciseIcon exercise={exercise} />
        <Text numberOfLines={1}>{exercise.name}</Text>
      </CardItem>
      <CardItem>
        <Body style={styles.body}>
          <Text>{getExerciseFormattedRx(exercise)}</Text>
          <Text>Rest: {getFormattedDuration(exercise.restSeconds)}</Text>
        </Body>
      </CardItem>
    </Card>
  )
}

ExerciseDetails.propTypes = {
  exercise: PropTypes.object.isRequired,
}

export default ExerciseDetails

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
