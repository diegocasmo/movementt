import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Header, Body, Title, View } from 'native-base'
import WorkoutForm from '../../../components/workout-form/WorkoutForm'
import { getUser } from '../../../state/reducers/auth'
import { showError } from '../../../utils/toast'
import { createWorkout } from '../../../state/reducers/workouts'

const CreateWorkoutScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const user = useSelector(getUser)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (workout, { resetForm }) => {
    setIsSubmitting(true)
    try {
      await dispatch(createWorkout(user.uid, workout))
      resetForm()
      navigation.navigate('WorkoutItem', { workout })
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
