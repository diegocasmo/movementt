import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import { Body, Button, Card, CardItem, H1, Text, View } from 'native-base'
import { isDeleting } from '_state/reducers/workouts'
import WorkoutActions from '_components/WorkoutActions'
import Workout from '_api/models/Workout'

const WorkoutItem = ({
  workout,
  onStart,
  onUpdate = () => {},
  onDelete = () => {},
}) => {
  const deleting = useSelector((state) => isDeleting(state, workout.key))

  const handlePressOnStart = () => {
    if (deleting) return

    onStart(workout)
  }

  return (
    <Button
      transparent
      style={[styles.container, deleting ? styles.clearContainer : {}]}
      onPress={handlePressOnStart}
    >
      <Card style={styles.card}>
        <CardItem header style={styles.header}>
          <Text style={styles.name} numberOfLines={1}>
            <H1>{workout.name}</H1>
          </Text>
          <View style={styles.actions}>
            <WorkoutActions
              workout={workout}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          </View>
        </CardItem>
        <CardItem>
          <Body>
            <Text numberOfLines={2} style={styles.summary}>
              {Workout.formattedExercises(workout)}
            </Text>
          </Body>
        </CardItem>
        <View style={styles.rounds}>
          <Text>Rounds: {workout.rounds}</Text>
        </View>
      </Card>
    </Button>
  )
}

WorkoutItem.propTypes = {
  workout: PropTypes.object.isRequired,
  onStart: PropTypes.func.isRequired,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func,
}

export default WorkoutItem

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: 135,
    marginBottom: 15,
  },
  card: {
    height: 135,
    flex: 1,
  },
  clearContainer: {
    opacity: 0.5,
  },
  header: {
    paddingBottom: 0,
  },
  name: {
    maxWidth: '90%',
  },
  actions: {
    position: 'absolute',
    top: 8,
    right: -2,
    width: 40,
    height: 40,
  },
  summary: {
    marginBottom: 10,
  },
  rounds: {
    position: 'absolute',
    bottom: 10,
    right: 15,
  },
})
