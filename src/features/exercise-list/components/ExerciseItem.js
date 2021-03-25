import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { Button, Card, CardItem, H1, Text, View } from 'native-base'
import ExerciseActions from './ExerciseActions'

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
    }
  }

  return (
    <Button transparent style={styles.container} onPress={handlePress}>
      <Card
        style={[styles.card, destroying ? styles.opaque : {}]}
        onPress={handlePress}
      >
        <CardItem style={styles.cardItem}>
          <Text style={styles.name} numberOfLines={2}>
            <H1>{exercise.name}</H1>
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
    marginBottom: 30,
  },
  card: {
    flex: 1,
  },
  opaque: {
    opacity: 0.5,
  },
  cardItem: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    flex: 1,
  },
  actions: {},
})
