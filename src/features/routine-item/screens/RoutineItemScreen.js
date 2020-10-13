import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
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
import { getUser } from '_state/reducers/auth'
import { getRoutine, destroyRoutine } from '_state/reducers/routines'
import { showError } from '_utils/toast'
import { getFormattedDuration } from '_utils/time-utils'

const RoutineItemScreen = ({ navigation, route }) => {
  const dispatch = useDispatch()
  const user = useSelector(getUser)
  const routine = useSelector((state) =>
    getRoutine(state, route.params.routineKey)
  )

  const handleStart = () => {
    navigation.navigate('CreateWorkout', { routineKey: routine.key })
  }

  const handleUpdate = (routine) => {
    navigation.navigate('UpdateRoutine', { routineKey: routine.key })
  }

  const handleDelete = async (routine) => {
    try {
      dispatch(destroyRoutine({ uid: user.uid, ...routine }))
      navigation.navigate('Home')
    } catch (err) {
      showError(err.message)
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
            Round rest: {getFormattedDuration(routine.restSeconds)}
          </Text>

          <H2 style={styles.h2}>Exercises ({routine.exercises.length})</H2>
        </View>

        <RoutineActions
          routine={routine}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
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
      routineKey: PropTypes.string.isRequired,
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
