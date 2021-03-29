import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { ListItem, Left, Right, Text } from 'native-base'
import ExerciseActions from './ExerciseActions'
import { showError } from '_utils/toast'

const ExerciseItem = ({ exercise, onDestroy, onPress, onUpdate }) => {
  const [destroying, setDestroying] = useState(false)

  const handlePress = () => {
    if (destroying) return

    onPress(exercise)
  }

  const handleUpdate = () => {
    if (destroying) return

    onUpdate(exercise)
  }

  const handleDestroy = async () => {
    if (destroying) return

    try {
      setDestroying(true)
      await onDestroy(exercise)
    } catch (err) {
      setDestroying(false)
      showError(err)
    }
  }

  return (
    <ListItem
      noIndent
      style={[styles.listItem, destroying ? styles.opaque : {}]}
      onPress={handlePress}
    >
      <Left>
        <Text numberOfLines={1}>{exercise.name}</Text>
      </Left>
      <Right>
        <ExerciseActions
          exercise={exercise}
          destroying={destroying}
          onDestroy={handleDestroy}
          onUpdate={handleUpdate}
        />
      </Right>
    </ListItem>
  )
}

ExerciseItem.propTypes = {
  exercise: PropTypes.object.isRequired,
  onDestroy: PropTypes.func.isRequired,
  onPress: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
}

export default ExerciseItem

const styles = StyleSheet.create({
  listItem: {},
  opaque: {
    opacity: 0.5,
  },
})
