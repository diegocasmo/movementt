import React from 'react'
import { StyleSheet } from 'react-native'
import { Container } from 'native-base'
import SessionStartup from '../components/SessionStartup'
import moment from 'moment'

const NewSessionScreen = () => {
  const onSessionStartupCompleted = () => {
    console.log('onSessionStartupCompleted')
  }

  return (
    <Container style={styles.content}>
      <SessionStartup
        finishAt={moment().add(10, 'seconds')}
        onSessionStartupCompleted={onSessionStartupCompleted}
      />
    </Container>
  )
}

export default NewSessionScreen

NewSessionScreen.navigationOptions = {
  headerShown: false,
  gestureEnabled: false,
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
