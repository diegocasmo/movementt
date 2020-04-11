import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { start, hasStarted } from '../reducers/new-session'
import { StyleSheet } from 'react-native'
import { Container, Content } from 'native-base'
import SessionControls from '../components/SessionControls'
import SessionStartup from '../components/SessionStartup'
import { workouts } from '../../../seed/workouts.json'

const NewSessionScreen = () => {
  const dispatch = useDispatch()
  const started = useSelector(hasStarted)
  const workout = workouts[0]

  const handleStartupCompleted = () => {
    dispatch(start(workout))
  }

  const renderSession = () => {
    return (
      <Content padder contentContainerStyle={styles.sessionContainer}>
        <SessionControls />
      </Content>
    )
  }

  const renderSessionStartup = () => {
    return (
      <Content padder contentContainerStyle={styles.sessionStartupContainer}>
        <SessionStartup
          workout={workout}
          onStartupCompleted={handleStartupCompleted}
        />
      </Content>
    )
  }

  return (
    <Container>{started ? renderSession() : renderSessionStartup()}</Container>
  )
}

export default NewSessionScreen

const styles = StyleSheet.create({
  sessionStartupContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sessionContainer: {
    flex: 1,
    alignItems: 'center',
  },
})
