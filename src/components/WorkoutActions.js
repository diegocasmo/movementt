import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { StyleSheet, Alert } from 'react-native'
import { ActionSheet, Button, Icon, Spinner } from 'native-base'
import { isDeleting } from '_state/reducers/workouts'
import Workout from '_api/models/Workout'

const BUTTONS = [{ text: 'Edit' }, { text: 'Delete' }, { text: 'Cancel' }]
const DESTRUCTIVE_INDEX = 1
const CANCEL_INDEX = 2

const WorkoutActions = ({ workout, onUpdate, onDelete }) => {
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
          onPress: async () => {
            if (deleting) return

            onDelete(workout)
          },
        },
      ],
      { cancelable: false }
    )
  }

  const handlePressOnActions = () => {
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

  if (Workout.isFromSeed(workout)) return null

  if (deleting) {
    return <Spinner style={styles.spinner} color="black" size="small" />
  }

  return (
    <Button
      transparent
      style={styles.actionsBtn}
      onPress={handlePressOnActions}
    >
      <Icon style={styles.actionBtn} active name="md-more" />
    </Button>
  )
}

export default WorkoutActions

WorkoutActions.propTypes = {
  workout: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  actionsBtn: {
    width: 40,
    height: 40,
  },
  spinner: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionBtn: {
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
