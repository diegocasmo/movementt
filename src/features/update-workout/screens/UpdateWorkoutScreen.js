import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Header, Body, Title } from 'native-base'
import WorkoutForm from '_components/workout-form/WorkoutForm'
import { getUser } from '_state/reducers/auth'
import { showError } from '_utils/toast'
import { updateWorkout, getWorkout } from '_state/reducers/workouts'

const UpdateWorkoutScreen = ({ navigation, route }) => {
  const workout = useSelector((state) =>
    getWorkout(state, route.params.workoutKey)
  )
  const dispatch = useDispatch()
  const user = useSelector(getUser)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (workout, { resetForm }) => {
    setIsSubmitting(true)
    try {
      await dispatch(updateWorkout(user.uid, workout))
      resetForm()
      navigation.pop()
    } catch (err) {
      showError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleQuit = () => {
    navigation.pop()
  }

  return (
    <Container>
      <Header>
        <Body>
          <Title>Update Workout</Title>
        </Body>
      </Header>
      <WorkoutForm
        submitText="Update Workout"
        workout={workout}
        isSubmitting={isSubmitting}
        onQuit={handleQuit}
        onSubmit={handleSubmit}
      />
    </Container>
  )
}

export default UpdateWorkoutScreen

UpdateWorkoutScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      workoutKey: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}
