import React from 'react'
import PropTypes from 'prop-types'
import { Container } from 'native-base'
import RoutineForm from '_components/routine-form/RoutineForm'
import { useRoutine } from '_services/routines/useRoutine'
import { useUpdateRoutine } from '_services/routines/useUpdateRoutine'
import { showError } from '_utils/toast'

const UpdateRoutineScreen = ({
  navigation,
  route: {
    params: { routineId = null, newlySelected = [] },
  },
}) => {
  const updateRoutine = useUpdateRoutine()
  const { data: routine } = useRoutine(routineId)

  const handleAddExercises = (selected) => {
    navigation.navigate('AddExerciseList', {
      prevScreenName: 'UpdateRoutine',
      prevSelected: selected,
      routineId,
    })
  }

  const handleSubmit = async (routine, { resetForm }) => {
    try {
      await updateRoutine.mutateAsync({
        pathParams: { id: routine.id },
        bodyParams: routine,
      })
      resetForm()
      navigation.pop()
    } catch (err) {
      showError(err)
    }
  }

  return (
    <Container>
      <RoutineForm
        routine={routine}
        newlySelected={newlySelected}
        isSubmitting={updateRoutine.isLoading}
        onAddExercises={handleAddExercises}
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
      newlySelected: PropTypes.array,
    }).isRequired,
  }).isRequired,
}
