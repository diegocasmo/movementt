import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { ListItem, Left, Right, View, Text } from 'native-base'
import ExerciseActions from './ExerciseActions'
import { showError } from '_utils/toast'

const ExerciseItem = ({ exercise, count, onDestroy, onPress, onUpdate }) => {
  const [destroying, setDestroying] = useState(false)
  const hasCount = count > 0

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
      <Left style={styles.left}>
        <Text numberOfLines={1}>{exercise.name}</Text>
      </Left>
      <Right style={[styles.right, hasCount ? styles.withCount : {}]}>
        {hasCount && (
          <View style={styles.count}>
            <Text style={styles.countText}>{count}</Text>
          </View>
        )}
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

ExerciseItem.defaultProps = {
  count: 0,
}

ExerciseItem.propTypes = {
  exercise: PropTypes.object.isRequired,
  count: PropTypes.number,
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
  left: {},
  right: {
    marginLeft: 5,
    maxWidth: 70,
  },
  withCount: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  count: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    borderRadius: 100,
    width: 35,
    height: 35,
  },
  countText: {
    color: 'white',
  },
})
