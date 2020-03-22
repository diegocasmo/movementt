import React from 'react'
import { StyleSheet } from 'react-native'
import { Container, Header, Body, Title, Content } from 'native-base'
import { workouts } from '../../../seed/workouts.json'
import WorkoutItem from '../components/WorkoutItem'

const WorkoutListScreen = () => {
  return (
    <Container>
      <Header>
        <Body>
          <Title>Workouts</Title>
        </Body>
      </Header>
      <Content style={styles.content}>
        {workouts.map((workout, idx) => (
          <WorkoutItem key={idx} workout={workout} />
        ))}
      </Content>
    </Container>
  )
}

export default WorkoutListScreen

const styles = StyleSheet.create({
  content: {
    margin: 10,
  },
})
