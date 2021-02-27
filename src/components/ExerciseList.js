import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { StyleSheet } from 'react-native'
import { unwrapResult } from '@reduxjs/toolkit'
import { Content, Spinner, Button, Text, View } from 'native-base'
import {
  createExercise,
  destroyExercise,
  updateExercise,
} from '_state/reducers/exercises'
import { showError } from '_utils/toast'
import SearchForm from '_components/SearchForm'
import ExerciseItem from '_features/exercise-list/components/ExerciseItem'
import ExerciseForm from '_features/exercise-list/components/ExerciseForm'
import Exercise from '_api/exercise'

const ExerciseList = ({
  exercises,
  fetching,
  onPress,
  onQueryChange,
  onRetry,
  query,
  showRetry,
}) => {
  const dispatch = useDispatch()
  const initialState = { visible: false, exercise: Exercise.DEFAULT }
  const [state, setState] = useState(initialState)
  const trimmedQuery = query.trim()

  const handleCreate = () => {
    setState({ ...state, visible: true })
  }

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

  const handleDestroy = async (exercise) => {
    try {
      const action = await dispatch(destroyExercise(exercise))
      unwrapResult(action)
    } catch (err) {
      showError(err.message)
    }
  }

  const handleCancel = () => {
    setState(initialState)
  }

  const handleSubmit = async (exercise) => {
    try {
      const action = await dispatch(
        exercise.created_at
          ? updateExercise(exercise)
          : createExercise(exercise)
      )
      unwrapResult(action)
      setState(initialState)
    } catch (err) {
      showError(err.message)
    }
  }

  const noMatches = exercises.length === 0 && trimmedQuery !== ''
  const noExercises = exercises.length === 0 && trimmedQuery === ''

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
        onCreate={handleCreate}
      />
      {fetching ? (
        <Spinner color="black" />
      ) : showRetry ? (
        <Button primary block style={styles.btn} onPress={onRetry}>
          <Text>Retry</Text>
        </Button>
      ) : (
        <View>
          {noExercises && <Text>There are no exercises to show</Text>}
          {noMatches && (
            <Text style={styles.noMatchesText}>
              We could not find any exercises based on your criteria
            </Text>
          )}
          {exercises.map((exercise) => (
            <ExerciseItem
              key={exercise.id}
              exercise={exercise}
              onPress={handlePress}
              onUpdate={handleUpdate}
              onDestroy={handleDestroy}
            />
          ))}
          {trimmedQuery !== '' && (
            <Button primary block onPress={handlePrefillExercise}>
              <Text>+ {trimmedQuery}</Text>
            </Button>
          )}
          {state.visible && (
            <ExerciseForm
              exercise={state.exercise}
              onCancel={handleCancel}
              onSubmit={handleSubmit}
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
  exercises: PropTypes.array.isRequired,
  fetching: PropTypes.bool.isRequired,
  onPress: PropTypes.func,
  onQueryChange: PropTypes.func.isRequired,
  onRetry: PropTypes.func.isRequired,
  query: PropTypes.string,
  showRetry: PropTypes.bool.isRequired,
}

const styles = StyleSheet.create({
  content: {
    margin: 10,
    paddingBottom: 25,
  },
  searchForm: {
    marginBottom: 20,
  },
  noMatchesText: {
    marginBottom: 20,
  },
})
