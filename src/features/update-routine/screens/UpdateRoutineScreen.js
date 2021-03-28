import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Container, Header, Body, Title } from 'native-base'
import RoutineForm from '_components/routine-form/RoutineForm'
import { useRoutines } from '_hooks/use-routines'
import { showError } from '_utils/toast'

const UpdateRoutineScreen = ({ navigation, route }) => {
  const [updating, setIsUpdating] = useState(false)
  const { findById, routines, update: updateRoutine } = useRoutines()
  const routine = findById(routines, route.params.routineId)

  const handleSubmit = async (routine, { resetForm }) => {
    setIsUpdating(true)

    try {
      await updateRoutine(routine)
      resetForm()
      navigation.pop()
    } catch (err) {
      setIsUpdating(false)
      showError(err)
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
        isSubmitting={updating}
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
      routineId: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
}
