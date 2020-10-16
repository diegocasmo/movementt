import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import { Button, Card, CardItem, H1, Text, View, Icon } from 'native-base'
import { isDestroying } from '_state/reducers/exercises'
import ExerciseActions from './ExerciseActions'
import ExerciseIcon from '_components/ExerciseIcon'

const ExerciseItem = ({ exercise, onDestroy, onPress, onUpdate }) => {
  const destroying = useSelector((state) => isDestroying(state, exercise.key))

  const handlePress = () => {
    onPress(exercise)
  }

  const handleUpdate = () => {
    onUpdate(exercise)
  }

  return (
    <Button
      transparent
      style={[styles.container, destroying ? styles.opaque : {}]}
      onPress={handlePress}
    >
      <Card style={styles.card} onPress={handlePress}>
        <CardItem style={styles.cardItem}>
          <ExerciseIcon exercise={exercise} />
          <Text style={styles.name} numberOfLines={2}>
            <H1>{exercise.name}</H1>
          </Text>
          <View style={styles.actions}>
            <ExerciseActions
              exercise={exercise}
              onDestroy={onDestroy}
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
  actions: {
    width: 40,
    height: 40,
  },
})
