import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { StyleSheet } from 'react-native'
import { Body, Container, Header, Title, View, Text } from 'native-base'
import {
  fetchWorkouts,
  getWorkouts,
  hasMore,
  isFetching,
} from '_state/reducers/workouts'
import { showError } from '_utils/toast'
import WorkoutList from '../components/WorkoutList'
import { getUser } from '_state/reducers/auth'

const WorkoutListScreen = () => {
  const dispatch = useDispatch()
  const user = useSelector(getUser)
  const fetching = useSelector(isFetching)
  const [showRetry, setShowRetry] = useState(false)
  const workouts = useSelector(getWorkouts)
  const more = useSelector(hasMore)

  useEffect(() => {
    handleFetch()
  }, [dispatch])

  const handleFetch = async () => {
    if (!more) return

    setShowRetry(false)

    try {
      const action = await dispatch(fetchWorkouts(user.uid))
      unwrapResult(action)
    } catch (err) {
      setShowRetry(true)
      showError(err.message)
    }
  }

  const renderCount = () => {
    const count = workouts.length
    if (fetching && count === 0) {
      return <Text>(0)</Text>
    }

    return <Text>({more ? `${count}+` : count})</Text>
  }

  return (
    <Container>
      <Header>
        <Body>
          <Title>Workouts {renderCount()}</Title>
        </Body>
      </Header>
      <View style={styles.content}>
        <WorkoutList
          fetching={fetching}
          onFetch={handleFetch}
          workouts={workouts}
          showRetry={showRetry}
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
