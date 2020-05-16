import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet } from 'react-native'
import {
  Body,
  Button,
  Container,
  Content,
  Header,
  Spinner,
  Text,
  Title,
} from 'native-base'
import WorkoutItem from '../components/WorkoutItem'
import { fetchWorkouts, isFetching, getWorkouts } from '../reducers/workouts'
import { getUser } from '../../../state/reducers/auth'
import seed from '../../../seed/workouts.json'

const WorkoutListScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const user = useSelector(getUser)
  const fetching = useSelector(isFetching)
  // TODO: Remove workouts seed usage
  const workouts = useSelector(getWorkouts).concat(seed.workouts)

  useEffect(() => {
    dispatch(fetchWorkouts(user.uid))
  }, [dispatch])

  const onPress = () => {
    navigation.navigate('WorkoutForm')
  }

  const children =
    workouts.length === 0 ? (
      <Button primary onPress={onPress}>
        <Text>Create a workout</Text>
      </Button>
    ) : (
      workouts.map((workout, idx) => (
        <WorkoutItem key={idx} workout={workout} navigation={navigation} />
      ))
    )

  return (
    <Container>
      <Header>
        <Body>
          <Title>Workouts</Title>
        </Body>
      </Header>
      <Content
        contentContainerStyle={
          !fetching && workouts.length > 0
            ? styles.workoutsContent
            : styles.emptyContent
        }
        showsVerticalScrollIndicator={false}
      >
        {fetching ? <Spinner color="black" /> : children}
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
  },
  emptyContent: {
    margin: 10,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
