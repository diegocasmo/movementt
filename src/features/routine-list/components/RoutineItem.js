import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { Body, Card, CardItem, Text, View } from 'native-base'
import { Button } from '_components/ui'
import RoutineActions from '_components/RoutineActions'
import { ExerciseNames } from '_components/ExerciseNames'
import { showError } from '_utils/toast'

const RoutineItem = ({
  routine,
  onStart,
  onUpdate = () => {},
  onDestroy = () => {},
}) => {
  const [destroying, setDestroying] = useState(false)

  const handlePress = () => {
    if (destroying) return

    onStart(routine)
  }

  const handleUpdate = () => {
    if (destroying) return

    onUpdate(routine)
  }

  const handleDestroy = async () => {
    if (destroying) return

    try {
      setDestroying(true)
      await onDestroy(routine.id).unwrap()
    } catch (err) {
      setDestroying(false)
      showError(err)
    }
  }

  return (
    <Button
      colorScheme="transparent"
      style={styles.container}
      isText={false}
      onPress={handlePress}
    >
      <Card style={[styles.card, destroying ? styles.opaque : {}]}>
        <CardItem header style={styles.header}>
          <Text style={styles.name} numberOfLines={1}>
            {routine.name}
          </Text>
          <View style={styles.actions}>
            <RoutineActions
              routine={routine}
              destroying={destroying}
              onUpdate={handleUpdate}
              onDestroy={handleDestroy}
            />
          </View>
        </CardItem>
        <CardItem style={styles.bodyContainer}>
          <Body>
            <ExerciseNames
              numberOfLines={2}
              style={styles.summary}
              exercises={routine.exercises}
            />
          </Body>
        </CardItem>
        <View style={styles.rounds}>
          <Text>Rounds: {routine.rounds}</Text>
        </View>
      </Card>
    </Button>
  )
}

RoutineItem.propTypes = {
  routine: PropTypes.object.isRequired,
  onStart: PropTypes.func.isRequired,
  onUpdate: PropTypes.func,
  onDestroy: PropTypes.func,
}

export default RoutineItem

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: 115,
    marginBottom: 15,
  },
  card: {
    height: 115,
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
    maxWidth: '90%',
  },
  actions: {},
  bodyContainer: {
    paddingTop: 0,
  },
  summary: {
    marginBottom: 10,
  },
  rounds: {
    position: 'absolute',
    bottom: 10,
    right: 15,
  },
})
