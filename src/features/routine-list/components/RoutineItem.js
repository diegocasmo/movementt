import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { Body, Button, Card, CardItem, H1, Text, View } from 'native-base'
import RoutineActions from '_components/RoutineActions'
import { Routine } from '_api'

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
      await onDestroy(routine)
    } catch (err) {
      setDestroying(false)
    }
  }

  return (
    <Button transparent style={styles.container} onPress={handlePress}>
      <Card style={[styles.card, destroying ? styles.opaque : {}]}>
        <CardItem header style={styles.header}>
          <Text style={styles.name} numberOfLines={1}>
            <H1>{routine.name}</H1>
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
        <CardItem>
          <Body>
            <Text numberOfLines={2} style={styles.summary}>
              {Routine.getFormattedExercises(routine)}
            </Text>
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
    height: 135,
    marginBottom: 15,
  },
  card: {
    height: 135,
    flex: 1,
  },
  opaque: {
    opacity: 0.5,
  },
  header: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 0,
  },
  name: {
    maxWidth: '90%',
  },
  actions: {},
  summary: {
    marginBottom: 10,
  },
  rounds: {
    position: 'absolute',
    bottom: 10,
    right: 15,
  },
})
