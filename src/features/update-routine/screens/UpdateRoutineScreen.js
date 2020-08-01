import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Header, Body, Title } from 'native-base'
import RoutineForm from '_components/routine-form/RoutineForm'
import { getUser } from '_state/reducers/auth'
import { showError } from '_utils/toast'
import { updateRoutine, getRoutine } from '_state/reducers/routines'

const UpdateRoutineScreen = ({ navigation, route }) => {
  const routine = useSelector((state) =>
    getRoutine(state, route.params.routineKey)
  )
  const dispatch = useDispatch()
  const user = useSelector(getUser)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (routine, { resetForm }) => {
    setIsSubmitting(true)
    try {
      await dispatch(updateRoutine({ uid: user.uid, ...routine }))
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
          <Title>Update Routine</Title>
        </Body>
      </Header>
      <RoutineForm
        submitText="Update Routine"
        routine={routine}
        isSubmitting={isSubmitting}
        onQuit={handleQuit}
        onSubmit={handleSubmit}
      />
    </Container>
  )
}

export default UpdateRoutineScreen

UpdateRoutineScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      routineKey: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}
