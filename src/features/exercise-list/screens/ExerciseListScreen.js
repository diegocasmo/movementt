import React, { useState } from 'react'
import { Body, Container, Header, Title } from 'native-base'
import ExerciseList from '_components/ExerciseList'
import { useGetExercisesQuery } from '_state/services/exercise'
import { getExercises } from '_state/selectors/exercise'

const ExerciseListScreen = () => {
  const [query, setQuery] = useState('')
  const { data, isLoading } = useGetExercisesQuery()
  const exercises = getExercises(data, query)

  const handleQueryChange = (value) => {
    setQuery(value)
  }

  return (
    <Container>
      <Header>
        <Body>
          <Title>Exercises ({isLoading ? 0 : exercises.length})</Title>
        </Body>
      </Header>
      <ExerciseList
        exercises={exercises}
        fetching={isLoading}
        onQueryChange={handleQueryChange}
        query={query}
      />
    </Container>
  )
}

export default ExerciseListScreen
