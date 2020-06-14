import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet } from 'react-native'
import {
  Body,
  Container,
  Content,
  Header,
  Spinner,
  Title,
  View,
} from 'native-base'
import MyWorkouts from '../components/MyWorkouts'
import ExampleWorkouts from '../components/ExampleWorkouts'
import { getUser } from '../../../state/reducers/auth'
import {
  fetchWorkouts,
  isFetching,
  destroyWorkout,
} from '../../../state/reducers/workouts'
import { showError } from '../../../utils/toast'

const WorkoutListScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const user = useSelector(getUser)
  const fetching = useSelector(isFetching)

  useEffect(() => {
    handleFetch()
  }, [dispatch])

  const handleFetch = async () => {
    try {
      await dispatch(fetchWorkouts(user.uid))
    } catch (err) {
      showError(err.message)
    }
  }

  const handleUpdate = (workout) => {
    navigation.navigate('UpdateWorkout', { workoutKey: workout.key })
  }

  const handleDelete = async (workout) => {
    try {
      await dispatch(destroyWorkout(user.uid, workout))
    } catch (err) {
      showError(err.message)
    }
  }

  const handleStart = (workout) => {
    navigation.navigate('WorkoutItem', { workoutKey: workout.key })
  }

  const handleCreate = () => {
    navigation.navigate('CreateWorkout')
  }

  return (
    <Container>
      <Header>
        <Body>
          <Title>Workouts</Title>
        </Body>
      </Header>
      <Content
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {fetching ? (
          <Spinner color="black" />
        ) : (
          <View>
            <MyWorkouts
              onStart={handleStart}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
              onCreateWorkout={handleCreate}
            />
            <ExampleWorkouts onStart={handleStart} />
          </View>
        )}
      </Content>
    </Container>
  )
}

export default WorkoutListScreen

WorkoutListScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
}

const styles = StyleSheet.create({
  content: {
    margin: 10,
    paddingBottom: 25,
  },
})
