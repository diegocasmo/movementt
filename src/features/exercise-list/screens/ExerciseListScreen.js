import React, { useState } from 'react'
import { Body, Container, Header, Title } from 'native-base'
import ExerciseList from '_components/ExerciseList'
import { useExercises } from '_services/exercises/useExercises'
import { getExercises } from '_features/exercise-list/utils/getExercises'

const ExerciseListScreen = () => {
  const [query, setQuery] = useState('')
  const { data = [], isLoading } = useExercises()
  const exercises = getExercises(data, query)

  const handleQueryChange = (value) => {
    setQuery(value)
  }

  return (
    <Container>
      <Header>
        <Body>
          <Title>
            Exercises {Boolean(exercises.length) && `(${exercises.length})`}
          </Title>
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
