import React from 'react'
import { StyleSheet } from 'react-native'
import { Body, Container, Header, Title, View } from 'native-base'
import WorkoutList from '../components/WorkoutList'
import { useWorkouts } from '_services/workouts/useWorkouts'

const WorkoutListScreen = () => {
  const {
    data: { pages = [] } = {},
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useWorkouts()
  const workouts = pages.reduce((memo, workout) => memo.concat(workout), [])

  const handleFetchMore = () => {
    fetchNextPage()
  }

  return (
    <Container>
      <Header>
        <Body>
          <Title>
            Workouts{' '}
            {Boolean(workouts.length) &&
              `(${hasNextPage ? '+' : ''}${workouts.length})`}
          </Title>
        </Body>
      </Header>
      <View style={styles.content}>
        <WorkoutList
          onEndReached={handleFetchMore}
          isLoading={isFetching}
          workouts={workouts}
        />
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
