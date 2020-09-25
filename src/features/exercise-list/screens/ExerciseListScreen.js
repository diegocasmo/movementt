import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { Body, Container, Header, Title } from 'native-base'
import { getUser } from '_state/reducers/auth'
import {
  fetchExercises,
  getExercises,
  isFetching,
} from '_state/reducers/exercises'
import { showError } from '_utils/toast'
import { search } from '_utils/fuzzy-search'
import ExerciseList from '_components/ExerciseList'
import * as seed from '_seed/exercises.json'

const ExerciseListScreen = () => {
  const dispatch = useDispatch()
  const user = useSelector(getUser)
  const fetching = useSelector(isFetching)
  const [query, setQuery] = useState('')
  const [showRetry, setShowRetry] = useState(false)
  const exercises = search(
    useSelector(getExercises).concat(seed.exercises),
    query
  )

  useEffect(() => {
    handleFetch()
  }, [dispatch])

  const handleFetch = async () => {
    setShowRetry(false)

    try {
      const action = await dispatch(fetchExercises(user.uid))
      unwrapResult(action)
    } catch (err) {
      setShowRetry(true)
      showError(err.message)
    }
  }

  const handleQueryChange = (value) => {
    setQuery(value)
  }

  return (
    <Container>
      <Header>
        <Body>
          <Title>Exercises ({fetching ? 0 : exercises.length})</Title>
        </Body>
      </Header>
      <ExerciseList
        exercises={exercises}
        fetching={fetching}
        onQueryChange={handleQueryChange}
        onRetry={handleFetch}
        query={query}
        showRetry={showRetry}
      />
    </Container>
  )
}

export default ExerciseListScreen
