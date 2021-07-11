import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { ListItem, Left, Right, View, Text } from 'native-base'
import ExerciseActions from './ExerciseActions'
import { showError } from '_utils/toast'

const ExerciseItem = ({
  exercise,
  selectedCount = 0,
  onDestroy,
  onPress,
  onUpdate,
}) => {
  const [destroying, setDestroying] = useState(false)
  const hasCount = selectedCount > 0

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
      await onDestroy(exercise).unwrap()
    } catch (err) {
      setDestroying(false)
      showError(err)
    }
  }

  return (
    <ListItem
      noIndent
      style={destroying ? styles.opaque : {}}
      onPress={handlePress}
    >
      <Left style={styles.left}>
        <Text numberOfLines={1}>{exercise.name}</Text>
      </Left>
      <Right style={[styles.right, hasCount ? styles.withCount : {}]}>
        {hasCount && (
          <View style={styles.selectedCount}>
            <Text style={styles.selectedCountText}>{selectedCount}</Text>
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

ExerciseItem.propTypes = {
  exercise: PropTypes.object.isRequired,
  selectedCount: PropTypes.number,
  onDestroy: PropTypes.func.isRequired,
  onPress: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
}

export default ExerciseItem

const styles = StyleSheet.create({
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
  selectedCount: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    borderRadius: 100,
    width: 35,
    height: 35,
  },
  selectedCountText: {
    color: 'white',
  },
})
