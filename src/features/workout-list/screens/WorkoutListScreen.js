import React, { useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { Body, Container, Header, Title, View } from 'native-base'
import WorkoutList from '../components/WorkoutList'
import { useGetWorkoutsQuery } from '_state/services/workout'
import { getWorkouts } from '_state/selectors/workout'
import { MAX_PER_PAGE } from '_api/utils/pagination'

const WorkoutListScreen = () => {
  const [page, setPage] = useState(1)
  const [workoutsById, setWorkoutsById] = useState({})
  const { data = [], isLoading, isFetching } = useGetWorkoutsQuery(page)
  const workouts = getWorkouts(Object.values(workoutsById))

  useEffect(() => {
    if (data.length === 0) return

    setWorkoutsById((workoutsById) => ({
      ...workoutsById,
      ...(data || []).reduce((memo, x) => ({ ...memo, [x.id]: x }), {}),
    }))
  }, [data, setWorkoutsById])

  const handleFetchMore = () => {
    if (isLoading) return
    if (isFetching) return
    if (data.length < MAX_PER_PAGE) return

    setPage((page) => page + 1)
  }

  return (
    <Container>
      <Header>
        <Body>
          <Title>
            Workouts ({data.length >= MAX_PER_PAGE ? '+' : ''}
            {isLoading ? 0 : workouts.length})
          </Title>
        </Body>
      </Header>
      <View style={styles.content}>
        <WorkoutList
          onEndReached={handleFetchMore}
          isLoading={isLoading || isFetching}
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
