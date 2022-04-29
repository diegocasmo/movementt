import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { Content, Spinner, Text, View, List } from 'native-base'
import SearchForm from '_components/SearchForm'
import ExerciseItem from '_features/exercise-list/components/ExerciseItem'
import ExerciseForm from '_features/exercise-list/components/ExerciseForm'
import { Exercise } from '_models'
import { useCreateExercise } from '_services/exercises/useCreateExercise'
import { useUpdateExercise } from '_services/exercises/useUpdateExercise'
import { showError } from '_utils/toast'

const ExerciseList = ({
  exercises,
  fetching,
  onPress,
  onQueryChange,
  query,
  selected = [],
}) => {
  const selectedMap = selected.reduce(
    (memo, { name }) =>
      memo[name] ? { ...memo, [name]: memo[name] + 1 } : { ...memo, [name]: 1 },
    {}
  )
  const initialState = { visible: false, exercise: Exercise.DEFAULT }
  const [state, setState] = useState(initialState)
  const trimmedQuery = query.trim()

  const createExercise = useCreateExercise()
  const updateExercise = useUpdateExercise()
  const handlePress = (exercise) => {
    // Delegate to parent if prop is defined
    if (onPress) return onPress(exercise)

    // Otherwise assume it's an update
    handleUpdate(exercise)
  }

  const handlePrefillExercise = () => {
    setState({
      visible: true,
      exercise: { ...Exercise.DEFAULT, name: trimmedQuery },
    })
  }

  const handleUpdate = (exercise) => {
    setState({ visible: true, exercise })
  }

  const handleCancel = () => {
    setState(initialState)
  }

  const handleSubmit = async (exercise) => {
    try {
      exercise.created_at
        ? await updateExercise.mutateAsync({
            pathParams: { id: exercise.id },
            bodyParams: exercise,
          })
        : await createExercise.mutateAsync({ bodyParams: exercise })
      setState(initialState)
    } catch (err) {
      showError(err)
    }
  }

  const hasQuery = trimmedQuery !== ''
  const noMatches = exercises.length === 0 && hasQuery
  const noExercises = exercises.length === 0 && !hasQuery

  return (
    <Content
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      enableResetScrollToCoords={false}
    >
      <SearchForm
        style={styles.searchForm}
        btnText="+ New"
        query={query}
        onChangeText={onQueryChange}
        onCreate={handlePrefillExercise}
      />
      {fetching ? (
        <Spinner color="black" />
      ) : (
        <View>
          {noExercises && <Text>There are no exercises to show</Text>}
          {noMatches && (
            <Text style={styles.noMatchesText}>
              We could not find any exercises based on your criteria
            </Text>
          )}
          <List style={styles.list}>
            {exercises.map((exercise) => (
              <ExerciseItem
                key={exercise.id}
                exercise={exercise}
                onPress={handlePress}
                onUpdate={handleUpdate}
                selectedCount={selectedMap[exercise.name]}
              />
            ))}
          </List>
          {state.visible && (
            <ExerciseForm
              exercise={state.exercise}
              onCancel={handleCancel}
              onSubmit={handleSubmit}
              isSubmitting={
                createExercise.isLoading || updateExercise.isLoading
              }
              visible={state.visible}
            />
          )}
        </View>
      )}
    </Content>
  )
}

export default ExerciseList

ExerciseList.propTypes = {
  selected: PropTypes.array,
  exercises: PropTypes.array.isRequired,
  fetching: PropTypes.bool.isRequired,
  onPress: PropTypes.func,
  onQueryChange: PropTypes.func.isRequired,
  query: PropTypes.string,
}

const styles = StyleSheet.create({
  content: {
    margin: 10,
    paddingBottom: 25,
  },
  searchForm: {
    marginBottom: 20,
  },
  list: {},
  noMatchesText: {
    marginBottom: 20,
  },
})
