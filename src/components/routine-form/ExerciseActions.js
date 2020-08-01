import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Alert } from 'react-native'
import { ActionSheet, Button, Icon } from 'native-base'

const BUTTONS = [{ text: 'Edit' }, { text: 'Delete' }, { text: 'Cancel' }]
const DESTRUCTIVE_INDEX = 1
const CANCEL_INDEX = 2

const ExerciseActions = ({ exercise, onUpdate, onDelete }) => {
  const handleDelete = () => {
    Alert.alert(
      'Delete Exercise',
      `Are you sure you want to delete the "${exercise.name}" exercise?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            onDelete(exercise)
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
        switch (buttonIndex) {
          case 0:
            return onUpdate(exercise)
          case 1:
            return handleDelete()
        }
      }
    )
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

export default ExerciseActions

ExerciseActions.propTypes = {
  exercise: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  actionsBtn: {
    width: 40,
    height: 40,
  },
  actionBtn: {
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
