import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Container } from 'native-base'
import RoutineForm from '_components/routine-form/RoutineForm'
import { Routine } from '_api'
import { useCreateRoutineMutation } from '_state/services/routine'
import { showError } from '_utils/toast'

const CreateRoutineScreen = ({
  navigation,
  route: {
    params: { name = '', newlySelected = [] },
  },
}) => {
  const [createRoutine] = useCreateRoutineMutation()
  const [isCreating, setIsCreating] = useState(false)

  const handleAddExercises = (selected) => {
    navigation.navigate('AddExerciseList', {
      prevScreenName: 'CreateRoutine',
      prevSelected: selected,
    })
  }

  const handleSubmit = async (attrs, { resetForm }) => {
    setIsCreating(true)

    try {
      const { data } = await createRoutine(attrs).unwrap()
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
        routine={{
          ...Routine.DEFAULT,
          name,
        }}
        newlySelected={newlySelected}
        isSubmitting={isCreating}
        onAddExercises={handleAddExercises}
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
      newlySelected: PropTypes.array,
    }).isRequired,
  }).isRequired,
}
