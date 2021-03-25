import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import {
  Body,
  Button,
  Container,
  Content,
  Header,
  Spinner,
  Text,
  Title,
  View,
} from 'native-base'
import RoutineItem from '../components/RoutineItem'
import SearchForm from '_components/SearchForm'
import { useRoutines } from '_hooks/use-routines'

const RoutineListScreen = ({ navigation }) => {
  const [query, setQuery] = useState('')
  const trimmedQuery = query.trim()
  const { routines, loading, destroy: destroyRoutine } = useRoutines(query)

  const handleQueryChange = (value) => {
    setQuery(value)
  }

  const handleUpdate = (routine) => {
    navigation.navigate('UpdateRoutine', { routineId: routine.id })
  }

  const handleStart = (routine) => {
    navigation.navigate('RoutineItem', { routineId: routine.id })
  }

  const handleCreate = () => {
    navigation.navigate('CreateRoutine', { name: trimmedQuery })
  }

  const hasQuery = trimmedQuery !== ''
  const noMatches = routines.length === 0 && hasQuery
  const noRoutines = routines.length === 0 && !hasQuery

  return (
    <Container>
      <Header>
        <Body>
          <Title>Routines ({loading ? 0 : routines.length})</Title>
        </Body>
      </Header>
      <Content
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <SearchForm
          style={styles.searchForm}
          btnText="+ New"
          query={query}
          onChangeText={handleQueryChange}
          onCreate={handleCreate}
        />
        {loading ? (
          <Spinner color="black" />
        ) : (
          <View>
            {noRoutines && <Text>There are no routines to show</Text>}
            {noMatches && (
              <Text>We could not find any routines based on your criteria</Text>
            )}
            {routines.map((routine) => (
              <RoutineItem
                key={routine.id}
                routine={routine}
                onStart={handleStart}
                onUpdate={handleUpdate}
                onDestroy={destroyRoutine}
              />
            ))}
            {hasQuery && (
              <Button primary block style={styles.btn} onPress={handleCreate}>
                <Text>+ {trimmedQuery}</Text>
              </Button>
            )}
          </View>
        )}
      </Content>
    </Container>
  )
}

export default RoutineListScreen

RoutineListScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
}

const styles = StyleSheet.create({
  content: {
    margin: 10,
    paddingBottom: 25,
  },
  searchForm: {
    marginBottom: 20,
  },
  retryBtn: {
    marginTop: 20,
  },
  btn: {
    marginTop: 20,
  },
})
