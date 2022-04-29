import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { Body, Card, CardItem, Text, View } from 'native-base'
import { Button } from '_components/ui'
import RoutineActions from '_components/RoutineActions'
import { ExerciseNames } from '_components/ExerciseNames'
import { showError } from '_utils/toast'
import { useDeleteRoutine } from '_services/routines/useDeleteRoutine'

const RoutineItem = ({ routine, onStart, onUpdate = () => {} }) => {
  const deleteRoutine = useDeleteRoutine()

  const handlePress = () => {
    if (deleteRoutine.isLoading) return

    onStart(routine)
  }

  const handleUpdate = () => {
    if (deleteRoutine.isLoading) return

    onUpdate(routine)
  }

  const handleDestroy = async () => {
    if (deleteRoutine.isLoading) return

    try {
      await deleteRoutine.mutateAsync({ pathParams: { id: routine.id } })
    } catch (err) {
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
      <Card style={[styles.card, deleteRoutine.isLoading ? styles.opaque : {}]}>
        <CardItem header style={styles.header}>
          <Text style={styles.name} numberOfLines={1}>
            {routine.name}
          </Text>
          <View style={styles.actions}>
            <RoutineActions
              routine={routine}
              destroying={deleteRoutine.isLoading}
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
