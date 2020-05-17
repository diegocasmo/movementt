import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet } from 'react-native'
import { Body, Container, Content, Header, Spinner, Title } from 'native-base'
import WorkoutItem from '../components/WorkoutItem'
import { getUser } from '../../../state/reducers/auth'
import {
  fetchWorkouts,
  isFetching,
  getWorkouts,
} from '../../../state/reducers/workouts'
import { showError } from '../../../utils/toast'
import seed from '../../../seed/workouts.json'

const WorkoutListScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const user = useSelector(getUser)
  const fetching = useSelector(isFetching)
  const workouts = useSelector(getWorkouts)

  const handleFetchWorkouts = async () => {
    try {
      await dispatch(fetchWorkouts(user.uid))
    } catch (err) {
      showError(err.message)
    }
  }

  useEffect(() => {
    handleFetchWorkouts()
  }, [dispatch])

  const handleWorkoutPress = (workout) => {
    navigation.navigate('NewSession', { workout })
  }

  return (
    <Container>
      <Header>
        <Body>
          <Title>Workouts</Title>
        </Body>
      </Header>
      <Content
        contentContainerStyle={
          fetching ? styles.emptyContent : styles.workoutsContent
        }
        showsVerticalScrollIndicator={false}
      >
        {fetching ? (
          <Spinner color="black" />
        ) : (
          workouts
            .concat(seed.workouts)
            .map((workout) => (
              <WorkoutItem
                key={workout.key}
                a
                workout={workout}
                onPress={handleWorkoutPress}
              />
            ))
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
  workoutsContent: {
    margin: 10,
    paddingBottom: 25,
  },
  emptyContent: {
    margin: 10,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
