import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Header, Body, Title, Content } from 'native-base'
import WorkoutForm from '../../../components/workout-form/WorkoutForm'
import { getUser } from '../../../state/reducers/auth'
import { showError } from '../../../utils/toast'
import { updateWorkout } from '../../../state/reducers/workouts'

const UpdateWorkoutScreen = ({ navigation, route }) => {
  const {
    params: { workout },
  } = route
  const dispatch = useDispatch()
  const user = useSelector(getUser)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (workout, { resetForm }) => {
    setIsSubmitting(true)
    try {
      await dispatch(updateWorkout(user.uid, workout))
      resetForm()
      navigation.navigate('Home')
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
          <Title>Update Workout</Title>
        </Body>
      </Header>
      <Content padder showsVerticalScrollIndicator={false}>
        <WorkoutForm
          submitText="Update Workout"
          workout={workout}
          isSubmitting={isSubmitting}
          onQuit={handleQuit}
          onSubmit={handleSubmit}
        />
      </Content>
    </Container>
  )
}

export default UpdateWorkoutScreen

UpdateWorkoutScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      workout: PropTypes.object.isRequired,
    }).isRequired,
  }).isRequired,
}
