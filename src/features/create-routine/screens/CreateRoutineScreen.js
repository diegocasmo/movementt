import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Container } from 'native-base'
import RoutineForm from '_components/routine-form/RoutineForm'
import { Routine } from '_api'
import { useCreateRoutineMutation } from '_state/services/routine'
import { showError } from '_utils/toast'

const CreateRoutineScreen = ({ navigation, route }) => {
  const [createRoutine] = useCreateRoutineMutation()
  const [isCreating, setIsCreating] = useState(false)
  const { name = '' } = route.params

  const handleSubmit = async (attrs, { resetForm }) => {
    setIsCreating(true)

    try {
      const { data } = await createRoutine(attrs)
      if (data) {
        resetForm()
        navigation.navigate('RoutineItem', { routineId: data.id })
      }
    } catch (err) {
      setIsCreating(false)
      showError(err)
    }
  }

  return (
    <Container>
      <RoutineForm
        autoFocus={true}
        routine={{ ...Routine.DEFAULT, name }}
        isSubmitting={isCreating}
        onSubmit={handleSubmit}
      />
    </Container>
  )
}

export default CreateRoutineScreen

CreateRoutineScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      name: PropTypes.string,
    }).isRequired,
  }).isRequired,
}
