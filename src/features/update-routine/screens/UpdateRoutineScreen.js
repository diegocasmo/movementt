import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Container } from 'native-base'
import RoutineForm from '_components/routine-form/RoutineForm'
import {
  useUpdateRoutineMutation,
  useGetRoutinesQuery,
} from '_state/services/routine'
import { findRoutineById } from '_state/selectors/routine'
import { showError } from '_utils/toast'

const UpdateRoutineScreen = ({
  navigation,
  route: {
    params: { routineId = null, newlySelected = [] },
  },
}) => {
  const { routine } = useGetRoutinesQuery(undefined, {
    selectFromResult: ({ data }) => ({
      routine: findRoutineById(data, routineId),
    }),
  })
  const [updateRoutine] = useUpdateRoutineMutation()
  const [updating, setIsUpdating] = useState(false)

  const handleAddExercises = (selected) => {
    navigation.navigate('AddExerciseList', {
      prevScreenName: 'UpdateRoutine',
      prevSelected: selected,
    })
  }

  const handleSubmit = async (routine, { resetForm }) => {
    setIsUpdating(true)

    try {
      await updateRoutine(routine).unwrap()
      resetForm()
      navigation.pop()
    } catch (err) {
      setIsUpdating(false)
      showError(err)
    }
  }

  return (
    <Container>
      <RoutineForm
        routine={routine}
        newlySelected={newlySelected}
        isSubmitting={updating}
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
