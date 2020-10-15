import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
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
import { getUser } from '_state/reducers/auth'
import {
  destroyRoutine,
  fetchRoutines,
  getRoutines,
  isFetching,
} from '_state/reducers/routines'
import { showError } from '_utils/toast'
import { search } from '_utils/fuzzy-search'

const RoutineListScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const user = useSelector(getUser)
  const fetching = useSelector(isFetching)
  const [query, setQuery] = useState('')
  const [showRetry, setShowRetry] = useState(false)
  const routines = search(useSelector(getRoutines), query)

  useEffect(() => {
    handleFetch()
  }, [dispatch])

  const handleFetch = async () => {
    setShowRetry(false)

    try {
      const action = await dispatch(fetchRoutines(user.uid))
      unwrapResult(action)
    } catch (err) {
      setShowRetry(true)
      showError(err.message)
    }
  }

  const handleUpdate = (routine) => {
    navigation.navigate('UpdateRoutine', { routineKey: routine.key })
  }

  const handleDelete = async (routine) => {
    try {
      await dispatch(destroyRoutine({ uid: user.uid, ...routine }))
    } catch (err) {
      showError(err.message)
    }
  }

  const handleStart = (routine) => {
    navigation.navigate('RoutineItem', { routineKey: routine.key })
  }

  const handleCreate = () => {
    navigation.navigate('CreateRoutine')
  }

  const handleQueryChange = (value) => {
    setQuery(value)
  }

  const noMatches = routines.length === 0 && query.trim() !== ''
  const noRoutines = routines.length === 0 && query.trim() === ''

  return (
    <Container>
      <Header>
        <Body>
          <Title>Routines ({fetching ? 0 : routines.length})</Title>
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
        {fetching ? (
          <Spinner color="black" />
        ) : showRetry ? (
          <Button primary block style={styles.retryBtn} onPress={handleFetch}>
            <Text>Retry</Text>
          </Button>
        ) : (
          <View>
            {noRoutines && <Text>There are no routines to show</Text>}
            {noMatches && (
              <Text>We could not find any routines based on your criteria</Text>
            )}
            {routines.map((routine) => (
              <RoutineItem
                key={routine.key}
                routine={routine}
                onStart={handleStart}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
              />
            ))}
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
})
