import React from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { Text, Card, CardItem, Body } from 'native-base'
import Exercise from '../../../api/models/Exercise'
import { getFormattedDuration } from '../../../utils/time-utils'

const ExerciseDetails = ({ exercise }) => {
  return (
    <Card style={styles.card}>
      <CardItem header style={styles.header}>
        <Text numberOfLines={1}>{exercise.name}</Text>
      </CardItem>
      <CardItem>
        <Body style={styles.body}>
          <Text>{Exercise.getInstructions(exercise)}</Text>
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
