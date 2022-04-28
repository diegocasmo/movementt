import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { Container, Content, H1, H2, Text, View, Spinner } from 'native-base'
import Duration from '_components/time/Duration'
import RoutineExerciseItem from '../components/RoutineExerciseItem'
import RoutineActions from '_components/RoutineActions'
import { showError } from '_utils/toast'
import { Button } from '_components/ui'
import { useRoutine } from '_services/routines/useRoutine'
import { useDeleteRoutine } from '_services/routines/useDeleteRoutine'

const RoutineItemScreen = ({ navigation, route }) => {
  const { data: routine } = useRoutine(route.params.routineId)
  const deleteRoutine = useDeleteRoutine()

  const handleStart = () => {
    if (deleteRoutine.isLoading) return

    navigation.navigate('SessionCreate', { routineId: routine.id })
  }

  const handleUpdate = (routine) => {
    if (deleteRoutine.isL) return

    navigation.navigate('UpdateRoutine', { routineId: routine.id })
  }

  const handleDestroy = async () => {
    if (deleteRoutine.isLoading) return

    try {
      await deleteRoutine.mutateAsync({ pathParams: { id: routine.id } })
      navigation.navigate('Home')
    } catch (err) {
      showError(err)
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
          <View style={styles.rest}>
            <Text style={styles.routineDetail}>Round rest:&nbsp;</Text>
            <Duration style={styles.duration} elapsedMs={routine.rest_ms} />
          </View>

          <H2 style={styles.h2}>Exercises ({routine.exercises.length})</H2>
        </View>

        <RoutineActions
          routine={routine}
          destroying={deleteRoutine.isLoading}
          onUpdate={handleUpdate}
          onDestroy={handleDestroy}
        />
      </View>

      <Content
        contentContainerStyle={[styles.content, styles.middle]}
        showsVerticalScrollIndicator={false}
      >
        {routine.exercises.map((exercise, idx) => (
          <RoutineExerciseItem key={idx} exercise={exercise} />
        ))}
      </Content>

      <View style={[styles.content, styles.bottom]}>
        <Button variant="block" onPress={handleStart}>
          Start Routine
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
  rest: {
    flexDirection: 'row',
  },
  duration: {
    fontWeight: 'normal',
    fontSize: 16,
  },
})
