import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { StyleSheet, Alert } from 'react-native'
import { ActionSheet, Button, Icon, Spinner } from 'native-base'
import { isDestroying } from '_state/reducers/exercises'

const BUTTONS = [{ text: 'Edit' }, { text: 'Delete' }, { text: 'Cancel' }]
const DESTRUCTIVE_INDEX = 1
const CANCEL_INDEX = 2

const ExerciseActions = ({ exercise, onUpdate, onDestroy }) => {
  const destroying = useSelector((state) => isDestroying(state, exercise.key))

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
            if (destroying) return

            onDestroy(exercise)
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
        if (destroying) return

        switch (buttonIndex) {
          case 0:
            return onUpdate(exercise)
          case 1:
            return handleDelete()
        }
      }
    )
  }

  if (destroying) {
    return <Spinner style={styles.spinner} color="black" size="small" />
  }

  return (
    <Button transparent style={styles.btn} onPress={handlePressOnActions}>
      <Icon style={styles.icon} active name="md-more" />
    </Button>
  )
}

export default ExerciseActions

ExerciseActions.propTypes = {
  exercise: PropTypes.object.isRequired,
  onDestroy: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  btn: {
    width: 40,
    height: 40,
  },
  spinner: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
