import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Alert } from 'react-native'
import { ActionSheet, Spinner } from 'native-base'
import { Button } from '_components/ui/Button'
import { Icon } from '_components/Icon'

const BUTTONS = [{ text: 'Edit' }, { text: 'Delete' }, { text: 'Cancel' }]
const DESTRUCTIVE_INDEX = 1
const CANCEL_INDEX = 2

const ExerciseActions = ({ destroying, exercise, onUpdate, onDestroy }) => {
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
          onPress: onDestroy,
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
    <Button
      colorScheme="transparent"
      style={styles.btn}
      onPress={handlePressOnActions}
      icon={<Icon style={styles.icon} name="md-ellipsis-vertical" />}
    />
  )
}

export default ExerciseActions

ExerciseActions.propTypes = {
  destroying: PropTypes.bool,
  exercise: PropTypes.object.isRequired,
  onDestroy: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  btn: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    color: 'black',
    position: 'relative',
  },
  spinner: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    position: 'absolute',
    right: 0,
  },
})
