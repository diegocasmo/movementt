import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { StyleSheet, Alert } from 'react-native'
import { ActionSheet, Button, Icon, Spinner } from 'native-base'
import { isDestroying } from '_state/reducers/routines'
import Routine from '_api/models/Routine'

const BUTTONS = [{ text: 'Edit' }, { text: 'Delete' }, { text: 'Cancel' }]
const DESTRUCTIVE_INDEX = 1
const CANCEL_INDEX = 2

const RoutineActions = ({ routine, onUpdate, onDelete }) => {
  const destroying = useSelector((state) => isDestroying(state, routine.key))

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
          onPress: async () => {
            if (destroying) return

            onDelete(routine)
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
            return onUpdate(routine)
          case 1:
            return handleDelete()
        }
      }
    )
  }

  if (Routine.isFromSeed(routine)) return null

  if (destroying) {
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

export default RoutineActions

RoutineActions.propTypes = {
  routine: PropTypes.object.isRequired,
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
