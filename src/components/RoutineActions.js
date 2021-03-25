import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Alert } from 'react-native'
import { ActionSheet, Button, Spinner } from 'native-base'
import { Icon } from '_components/Icon'

const BUTTONS = [{ text: 'Edit' }, { text: 'Delete' }, { text: 'Cancel' }]
const DESTRUCTIVE_INDEX = 1
const CANCEL_INDEX = 2

const RoutineActions = ({ destroying, routine, onUpdate, onDestroy }) => {
  const handleDelete = () => {
    Alert.alert(
      'Delete Routine',
      `Are you sure you want to delete the "${routine.name}" routine?`,
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
            return onUpdate(routine)
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
      transparent
      style={styles.actionsBtn}
      onPress={handlePressOnActions}
    >
      <Icon style={styles.actionBtn} name="md-ellipsis-vertical" />
    </Button>
  )
}

export default RoutineActions

RoutineActions.propTypes = {
  destroying: PropTypes.bool,
  routine: PropTypes.object.isRequired,
  onDestroy: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  actionsBtn: {
    justifyContent: 'flex-end',
    alignItems: 'center',
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
