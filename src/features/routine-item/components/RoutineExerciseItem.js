import React from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { View, Text, Card, CardItem, Body } from 'native-base'
import Duration from '_components/time/Duration'
import ExerciseIcon from '_components/ExerciseIcon'
import ExerciseRx from '_components/ExerciseRx'

const RoutineExerciseItem = ({ exercise }) => {
  return (
    <Card style={styles.card}>
      <CardItem header style={styles.header}>
        <ExerciseIcon exercise={exercise} />
        <Text numberOfLines={1}>{exercise.name}</Text>
      </CardItem>
      <CardItem>
        <Body style={styles.body}>
          <ExerciseRx exercise={exercise} />
          <View style={styles.restContainer}>
            <Text>Rest: </Text>
            <Duration style={styles.duration} elapsedMs={exercise.rest_ms} />
          </View>
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
  restContainer: {
    flexDirection: 'row',
  },
  duration: {
    fontWeight: 'normal',
    fontSize: 16,
  },
})
