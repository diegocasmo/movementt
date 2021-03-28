import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { Button, Card, CardItem, Text, View } from 'native-base'
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
    <Button transparent style={styles.container} onPress={handlePress}>
      <Card
        style={[styles.card, destroying ? styles.opaque : {}]}
        onPress={handlePress}
      >
        <CardItem header style={styles.header}>
          <Text style={styles.name} numberOfLines={2}>
            {exercise.name}
          </Text>
          <View style={styles.actions}>
            <ExerciseActions
              exercise={exercise}
              destroying={destroying}
              onDestroy={handleDestroy}
              onUpdate={handleUpdate}
            />
          </View>
        </CardItem>
      </Card>
    </Button>
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
  container: {
    marginBottom: 15,
  },
  card: {
    flex: 1,
  },
  opaque: {
    opacity: 0.5,
  },
  header: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 0,
    paddingBottom: 0,
  },
  name: {
    flex: 1,
  },
  actions: {},
})
