import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { ListItem, Left, Right, View, Text } from 'native-base'
import ExerciseActions from './ExerciseActions'
import { useDeleteExercise } from '_services/exercises/useDeleteExercise'
import { showError } from '_utils/toast'

const ExerciseItem = ({ exercise, selectedCount = 0, onPress, onUpdate }) => {
  const deleteExercise = useDeleteExercise()
  const hasCount = selectedCount > 0

  const handlePress = () => {
    if (deleteExercise.isLoading) return

    onPress(exercise)
  }

  const handleUpdate = () => {
    if (deleteExercise.isLoading) return

    onUpdate(exercise)
  }

  const handleDestroy = async () => {
    if (deleteExercise.isLoading) return

    try {
      await deleteExercise.mutateAsync({
        pathParams: { id: exercise.id },
      })
    } catch (err) {
      showError(err)
    }
  }

  return (
    <ListItem
      noIndent
      style={deleteExercise.isLoading ? styles.opaque : {}}
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
          destroying={deleteExercise.isLoading}
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
