import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import { Body, Button, Card, CardItem, H1, Text, View } from 'native-base'
import { isDestroying } from '_state/reducers/routines'
import RoutineActions from '_components/RoutineActions'
import { getRoutineFormattedExercises } from '_api/routine'

const RoutineItem = ({
  routine,
  onStart,
  onUpdate = () => {},
  onDelete = () => {},
}) => {
  const destroying = useSelector((state) => isDestroying(state, routine.key))

  const handlePressOnStart = () => {
    if (destroying) return

    onStart(routine)
  }

  return (
    <Button
      transparent
      style={[styles.container, destroying ? styles.clearContainer : {}]}
      onPress={handlePressOnStart}
    >
      <Card style={styles.card}>
        <CardItem header style={styles.header}>
          <Text style={styles.name} numberOfLines={1}>
            <H1>{routine.name}</H1>
          </Text>
          <View style={styles.actions}>
            <RoutineActions
              routine={routine}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          </View>
        </CardItem>
        <CardItem>
          <Body>
            <Text numberOfLines={2} style={styles.summary}>
              {getRoutineFormattedExercises(routine)}
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
  onDelete: PropTypes.func,
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
  clearContainer: {
    opacity: 0.5,
  },
  header: {
    paddingBottom: 0,
  },
  name: {
    maxWidth: '90%',
  },
  actions: {
    position: 'absolute',
    top: 8,
    right: -2,
    width: 40,
    height: 40,
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
