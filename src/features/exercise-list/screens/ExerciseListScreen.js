import React, { useState } from 'react'
import { Body, Container, Header, Title } from 'native-base'
import ExerciseList from '_components/ExerciseList'
import { useExercises } from '_hooks/use-exercises'

const ExerciseListScreen = () => {
  const [query, setQuery] = useState('')
  const { getExercises, loading } = useExercises(query)
  const exercises = getExercises(query)

  const handleQueryChange = (value) => {
    setQuery(value)
  }

  return (
    <Container>
      <Header>
        <Body>
          <Title>Exercises ({loading ? 0 : exercises.length})</Title>
        </Body>
      </Header>
      <ExerciseList
        exercises={exercises}
        fetching={loading}
        onQueryChange={handleQueryChange}
        query={query}
      />
    </Container>
  )
}

export default ExerciseListScreen
