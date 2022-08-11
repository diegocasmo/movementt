import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Keyboard } from 'react-native'
import { Container, Content, View } from 'native-base'
import { Button } from '_components/ui'
import ExerciseList from '_components/ExerciseList'
import { useExercises } from '_services/exercises/useExercises'
import { getExercises } from '_features/exercise-list/utils/getExercises'
import { useAuth } from '_context/AuthContext'
import { RoutineExercise } from '_models'

const AddExerciseListScreen = ({
  navigation,
  route: {
    params: { prevSelected, prevScreenName, routineId },
  },
}) => {
  const { user } = useAuth()
  const { data = [], isLoading } = useExercises()
  const [query, setQuery] = useState('')
  const [newlySelected, setNewlySelected] = useState([])
  const hasNewlySelected = newlySelected.length > 0
  const exercises = getExercises(data, query)
  const selected = [...prevSelected, ...newlySelected]

  const handleQueryChange = (value) => {
    setQuery(value)
  }

  const handleSelectExercise = async (exercise) => {
    Keyboard.dismiss()
    const routineExercise = await RoutineExercise.build({
      ...exercise,
      weight_unit_type: user.weight_unit_type,
      distance_unit_type: user.distance_unit_type,
      _create: true,
      _destroy: false,
      position: selected.length + 1,
    })

    setNewlySelected([...newlySelected, routineExercise])
  }

  const handleSubmit = () => {
    navigation.navigate(prevScreenName, {
      newlySelected: newlySelected,
      routineId,
    })
  }

  return (
    <Container>
      <Content
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.middle}>
          <ExerciseList
            exercises={exercises}
            fetching={isLoading}
            onPress={handleSelectExercise}
            onQueryChange={handleQueryChange}
            query={query}
            selected={selected}
          />
        </View>
        <View style={styles.bottom}>
          <Button
            colorScheme="success"
            variant="block"
            isDisabled={!hasNewlySelected}
            onPress={handleSubmit}
          >
            Add {hasNewlySelected && `(+${newlySelected.length})`}
          </Button>
        </View>
      </Content>
    </Container>
  )
}

AddExerciseListScreen.propTypes = {
  selected: PropTypes.array,
  navigation: PropTypes.object.isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      prevSelected: PropTypes.array,
      prevScreenName: PropTypes.string.isRequired,
      routineId: PropTypes.number,
    }).isRequired,
  }).isRequired,
}

export default AddExerciseListScreen

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  middle: {
    flex: 1,
    paddingBottom: 70,
  },
  bottom: {
    position: 'absolute',
    bottom: 20,
    left: 10,
    right: 10,
  },
})
