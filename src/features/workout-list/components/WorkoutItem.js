import React from 'react'
import { StyleSheet, Alert } from 'react-native'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import {
  ActionSheet,
  Body,
  Button,
  Card,
  CardItem,
  H1,
  Icon,
  Spinner,
  Text,
  View,
} from 'native-base'
import Workout from '../../../api/models/Workout'
import { isDeleting } from '../../../state/reducers/workouts'

const BUTTONS = [{ text: 'Edit' }, { text: 'Delete' }, { text: 'Cancel' }]
const DESTRUCTIVE_INDEX = 1
const CANCEL_INDEX = 2

const WorkoutItem = ({ workout, onStart, onUpdate, onDelete }) => {
  const deleting = useSelector((state) => isDeleting(state, workout.key))

  const handleDelete = () => {
    Alert.alert(
      'Delete Workout',
      `Are you sure you want to delete the "${workout.name}" workout?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            if (deleting) return

            onDelete(workout.key)
          },
        },
      ],
      { cancelable: false }
    )
  }

  const handlePressOnMore = () => {
    ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: CANCEL_INDEX,
        destructiveButtonIndex: DESTRUCTIVE_INDEX,
      },
      (buttonIndex) => {
        if (deleting) return

        switch (buttonIndex) {
          case 0:
            return onUpdate(workout)
          case 1:
            return handleDelete()
        }
      }
    )
  }

  const handlePressOnStart = () => {
    if (deleting) return

    onStart(workout)
  }

  return (
    <Card style={styles.container}>
      <CardItem
        header
        button
        style={styles.header}
        onPress={handlePressOnStart}
      >
        <Text style={styles.name} numberOfLines={1}>
          <H1>{workout.name}</H1>
        </Text>
        {!Workout.isFromSeed(workout) && (
          <View style={styles.options}>
            {deleting ? (
              <Spinner style={styles.spinner} color="black" size="small" />
            ) : (
              <Button transparent onPress={handlePressOnMore}>
                <Icon style={styles.moreIcon} active name="md-more" />
              </Button>
            )}
          </View>
        )}
      </CardItem>
      <CardItem button onPress={handlePressOnStart}>
        <Body>
          <Text numberOfLines={2} style={styles.summary}>
            {workout.exercises.map(({ name }) => name).join(', ')}
          </Text>
        </Body>
      </CardItem>
      <View style={styles.rounds}>
        <Text>Rounds: {workout.rounds}</Text>
      </View>
    </Card>
  )
}

WorkoutItem.defaultProps = {
  onUpdate: () => {},
  onDelete: () => {},
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
  },
  header: {
    paddingBottom: 0,
  },
  name: {
    maxWidth: '90%',
  },
  options: {
    position: 'absolute',
    top: 8,
    right: -2,
    width: 40,
    height: 40,
  },
  spinner: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreIcon: {
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
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
