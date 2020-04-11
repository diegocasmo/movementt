import React from 'react'
import { StyleSheet } from 'react-native'
import { Container, Content } from 'native-base'
import SessionControls from '../components/SessionControls'

const NewSessionScreen = () => {
  return (
    <Container style={styles.content}>
      <Content padder>
        <SessionControls />
      </Content>
    </Container>
  )
}

export default NewSessionScreen

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
})
