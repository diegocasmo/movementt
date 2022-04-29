import React from 'react'
import PropTypes from 'prop-types'
import { Container } from 'native-base'
import RoutineForm from '_components/routine-form/RoutineForm'
import { Routine } from '_models'
import { showError } from '_utils/toast'
import { useCreateRoutine } from '_services/routines/useCreateRoutine'

const CreateRoutineScreen = ({
  navigation,
  route: {
    params: { name = '', newlySelected = [] },
  },
}) => {
  const createRoutine = useCreateRoutine()

  const handleAddExercises = (selected) => {
    navigation.navigate('AddExerciseList', {
      prevScreenName: 'CreateRoutine',
      prevSelected: selected,
    })
  }

  const handleSubmit = async (attrs, { resetForm }) => {
    try {
      const data = await createRoutine.mutateAsync({ bodyParams: attrs })
      resetForm()
      navigation.navigate('RoutineItem', { routineId: data.id })
    } catch (err) {
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
        isSubmitting={createRoutine.isLoading}
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
