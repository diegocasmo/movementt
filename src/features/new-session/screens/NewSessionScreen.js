import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import {
  init,
  resetSession,
  start,
  hasStarted,
  isCompleted,
  getCurrTimeEntry,
  TIME_ENTRY_TYPE,
} from '../reducers/new-session'
import { StyleSheet } from 'react-native'
import { Container, Content } from 'native-base'
import TopControls from '../components/TopControls'
import BottomControls from '../components/BottomControls'
import SessionExercise from '../components/SessionExercise'
import SessionExerciseRest from '../components/SessionExerciseRest'
import SessionRoundRest from '../components/SessionRoundRest'
import SessionStartup from '../components/SessionStartup'
import SessionCompleted from '../components/SessionCompleted'
import { getRoutine } from '_state/reducers/routines'

const NewSessionScreen = ({ navigation, route }) => {
  const routine = useSelector((state) =>
    getRoutine(state, route.params.routineKey)
  )
  const dispatch = useDispatch()
  const started = useSelector(hasStarted)
  const completed = useSelector(isCompleted)
  const timeEntry = useSelector(getCurrTimeEntry)

  const handleStartupCompleted = () => {
    dispatch(init(routine))
    dispatch(start())
  }

  const handleQuit = () => {
    dispatch(resetSession())
    navigation.navigate('Home')
  }

  const handleCompleteConfirmed = () => {
    dispatch(resetSession())
    navigation.navigate('Home')
  }

  const renderTimeEntry = () => {
    switch (timeEntry.type) {
      case TIME_ENTRY_TYPE.EXERCISE_REST:
        return <SessionExerciseRest />
      case TIME_ENTRY_TYPE.ROUND_REST:
        return <SessionRoundRest />
      default:
        return <SessionExercise />
    }
  }

  if (completed) {
    return (
      <Container>
        <Content padder contentContainerStyle={styles.content}>
          <SessionCompleted onConfirm={handleCompleteConfirmed} />
        </Content>
      </Container>
    )
  }

  return (
    <Container>
      {started ? (
        <Content
          padder
          scrollEnabled={false}
          contentContainerStyle={styles.content}
        >
          <TopControls onQuit={handleQuit} />
          {renderTimeEntry()}
          <BottomControls />
        </Content>
      ) : (
        <Content
          padder
          scrollEnabled={false}
          contentContainerStyle={styles.content}
        >
          <SessionStartup
            routine={routine}
            onQuit={handleQuit}
            onStartupCompleted={handleStartupCompleted}
          />
        </Content>
      )}
    </Container>
  )
}

export default NewSessionScreen

NewSessionScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      routineKey: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
