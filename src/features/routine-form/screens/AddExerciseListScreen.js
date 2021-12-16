import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { StyleSheet, Keyboard } from 'react-native'
import { Container, Content, View, Button, Text } from 'native-base'
import ExerciseList from '_components/ExerciseList'
import { useGetExercisesQuery } from '_state/services/exercise'
import { getExercises } from '_state/selectors/exercise'
import { getUser } from '_state/reducers/auth'
import { RoutineExercise } from '_api'

const AddExerciseListScreen = ({
  navigation,
  route: {
    params: { prevSelected, prevScreenName, routineId },
  },
}) => {
  const user = useSelector(getUser)
  const { data, isLoading } = useGetExercisesQuery()
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
            success
            block
            disabled={!hasNewlySelected}
            onPress={handleSubmit}
          >
            <Text>Add {hasNewlySelected && `(+${newlySelected.length})`}</Text>
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
