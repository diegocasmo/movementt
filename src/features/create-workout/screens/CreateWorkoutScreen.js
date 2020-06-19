import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Header, Body, Title, View } from 'native-base'
import WorkoutForm from '_components/workout-form/WorkoutForm'
import { getUser } from '_state/reducers/auth'
import { showError } from '_utils/toast'
import { createWorkout } from '_state/reducers/workouts'

const CreateWorkoutScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const user = useSelector(getUser)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (attrs, { resetForm }) => {
    setIsSubmitting(true)
    try {
      const workout = await dispatch(createWorkout(user.uid, attrs))
      resetForm()
      navigation.navigate('WorkoutItem', { workoutKey: workout.key })
    } catch (err) {
      showError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleQuit = () => {
    navigation.navigate('Home')
  }

  return (
    <Container>
      <Header>
        <Body>
          <Title>Create Workout</Title>
        </Body>
      </Header>
      <WorkoutForm
        autoFocus={true}
        isSubmitting={isSubmitting}
        onQuit={handleQuit}
        onSubmit={handleSubmit}
      />
    </Container>
  )
}

export default CreateWorkoutScreen

CreateWorkoutScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
}
