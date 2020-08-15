import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet } from 'react-native'
import { unwrapResult } from '@reduxjs/toolkit'
import {
  Body,
  Container,
  Content,
  Header,
  Spinner,
  Text,
  Title,
  View,
} from 'native-base'
import { getUser } from '_state/reducers/auth'
import {
  createExercise,
  destroyExercise,
  fetchExercises,
  getExercises,
  isFetching,
  updateExercise,
} from '_state/reducers/exercises'
import { showError } from '_utils/toast'
import { search } from '_utils/fuzzy-search'
import SearchForm from '_components/SearchForm'
import ExerciseItem from '../components/ExerciseItem'
import ExerciseForm from '../components/ExerciseForm'
import { DEFAULT_EXERCISE } from '_api/exercise'
import * as seed from '_seed/exercises.json'

const ExerciseListScreen = () => {
  const dispatch = useDispatch()
  const user = useSelector(getUser)
  const fetching = useSelector(isFetching)
  const initialState = { visible: false, exercise: DEFAULT_EXERCISE }
  const [state, setState] = useState(initialState)
  const [query, setQuery] = useState('')
  const exercises = search(
    useSelector(getExercises).concat(seed.exercises),
    query
  )

  useEffect(() => {
    handleFetch()
  }, [dispatch])

  const handleFetch = async () => {
    try {
      const action = await dispatch(fetchExercises(user.uid))
      unwrapResult(action)
    } catch (err) {
      showError(err.message)
    }
  }

  const handleCreate = () => {
    setState({ ...state, visible: true })
  }

  const handleUpdate = (exercise) => {
    setState({ ...state, visible: true, exercise })
  }

  const handleDestroy = async (exercise) => {
    try {
      const action = await dispatch(
        destroyExercise({ uid: user.uid, ...exercise })
      )
      unwrapResult(action)
    } catch (err) {
      showError(err.message)
    }
  }

  const handleCancel = () => {
    setState(initialState)
  }

  const handleSubmit = async (exercise) => {
    setState(initialState)
    try {
      const attrs = { uid: user.uid, ...exercise }
      const action = await dispatch(
        exercise.createdAt ? updateExercise(attrs) : createExercise(attrs)
      )
      unwrapResult(action)
      setState(initialState)
    } catch (err) {
      showError(err.message)
    }
  }

  const handleQueryChange = (value) => {
    setQuery(value)
  }

  const noMatches = exercises.length === 0 && query.trim() !== ''
  const noExercises = exercises.length === 0 && query.trim() === ''

  return (
    <Container>
      <Header>
        <Body>
          <Title>Exercises ({exercises.length})</Title>
        </Body>
      </Header>
      <Content
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <SearchForm
          style={styles.searchForm}
          btnText="+ Exercise"
          query={query}
          onChangeText={handleQueryChange}
          onCreate={handleCreate}
        />
        {fetching ? (
          <Spinner color="black" />
        ) : (
          <View>
            {noExercises && <Text>There are no exercises to show</Text>}
            {noMatches && (
              <Text>
                We could not find any exercises based on your criteria
              </Text>
            )}
            {exercises.map((exercise) => (
              <ExerciseItem
                key={exercise.key}
                exercise={exercise}
                onUpdate={handleUpdate}
                onDestroy={handleDestroy}
              />
            ))}
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
    </Container>
  )
}

export default ExerciseListScreen

const styles = StyleSheet.create({
  content: {
    margin: 10,
    paddingBottom: 25,
  },
  searchForm: {
    marginBottom: 20,
  },
})
