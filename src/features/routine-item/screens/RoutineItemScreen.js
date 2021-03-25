import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import {
  Button,
  Container,
  Content,
  H1,
  H2,
  Text,
  View,
  Spinner,
} from 'native-base'
import ExerciseDetails from '../components/ExerciseDetails'
import RoutineActions from '_components/RoutineActions'
import { getFormattedDuration } from '_utils/time-utils'
import { useRoutines } from '_hooks/use-routines'

const RoutineItemScreen = ({ navigation, route }) => {
  const [destroying, setDestroying] = useState(false)
  const { findById, destroy: destroyRoutine } = useRoutines()
  const routine = findById(route.params.routineId)

  const handleStart = () => {
    if (destroying) return

    navigation.navigate('CreateWorkout', { routineId: routine.id })
  }

  const handleUpdate = (routine) => {
    if (destroying) return

    navigation.navigate('UpdateRoutine', { routineId: routine.id })
  }

  const handleDestroy = async () => {
    if (destroying) return

    try {
      setDestroying(true)
      await destroyRoutine(routine)
      navigation.navigate('Home')
    } catch (err) {
      setDestroying(false)
    }
  }

  if (!routine) {
    return (
      <Container>
        <Spinner color="black" size="small" />
      </Container>
    )
  }

  return (
    <Container>
      <View style={[styles.content, styles.top]}>
        <View>
          <H1 style={styles.h1}>Setup</H1>

          <Text style={styles.routineDetail}>Name: {routine.name}</Text>
          <Text style={styles.routineDetail}>Rounds: {routine.rounds}</Text>
          <Text style={styles.routineDetail}>
            Round rest: {getFormattedDuration(routine.rest_seconds)}
          </Text>

          <H2 style={styles.h2}>Exercises ({routine.exercises.length})</H2>
        </View>

        <RoutineActions
          routine={routine}
          destroying={destroying}
          onUpdate={handleUpdate}
          onDestroy={handleDestroy}
        />
      </View>

      <Content
        contentContainerStyle={[styles.content, styles.middle]}
        showsVerticalScrollIndicator={false}
      >
        {routine.exercises.map((exercise, idx) => (
          <ExerciseDetails key={idx} exercise={exercise} />
        ))}
      </Content>

      <View style={[styles.content, styles.bottom]}>
        <Button block onPress={handleStart}>
          <Text>Start Routine</Text>
        </Button>
      </View>
    </Container>
  )
}

export default RoutineItemScreen

RoutineItemScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      routineId: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
}

const styles = StyleSheet.create({
  content: {
    marginLeft: 10,
    marginRight: 10,
  },
  top: {
    marginTop: 10,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  middle: {
    paddingBottom: 75,
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    marginBottom: 10,
  },
  h1: {
    marginBottom: 12,
  },
  routineDetail: {
    marginBottom: 10,
  },
  h2: {
    marginBottom: 12,
  },
})
