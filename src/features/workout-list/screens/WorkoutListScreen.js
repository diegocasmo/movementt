import React from 'react'
import { StyleSheet } from 'react-native'
import { Body, Container, Header, Title, View } from 'native-base'
import WorkoutList from '../components/WorkoutList'
import { useGetWorkoutsQuery } from '_state/services/workout'
import { getWorkouts } from '_state/selectors/workout'

const WorkoutListScreen = () => {
  const { data, isLoading } = useGetWorkoutsQuery()
  const workouts = getWorkouts(data)

  return (
    <Container>
      <Header>
        <Body>
          <Title>Workouts ({isLoading ? 0 : workouts.length})</Title>
        </Body>
      </Header>
      <View style={styles.content}>
        <WorkoutList isLoading={isLoading} workouts={workouts} />
      </View>
    </Container>
  )
}

export default WorkoutListScreen

const styles = StyleSheet.create({
  content: {
    margin: 10,
  },
})
