import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet } from 'react-native'
import {
  Body,
  Button,
  Container,
  Content,
  H1,
  Header,
  Spinner,
  Text,
  Title,
  View,
} from 'native-base'
import RoutineItem from '../components/RoutineItem'
import SearchForm from '../components/SearchForm'
import { getUser } from '_state/reducers/auth'
import {
  destroyRoutine,
  fetchRoutines,
  getRoutines,
  isFetching,
} from '_state/reducers/routines'
import { showError } from '_utils/toast'
import * as seed from '_seed/routines.json'

const RoutineListScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const user = useSelector(getUser)
  const fetching = useSelector(isFetching)
  const routines = useSelector(getRoutines)
  const allRoutines = routines.concat(seed.routines)

  useEffect(() => {
    handleFetch()
  }, [dispatch])

  const handleFetch = async () => {
    try {
      await dispatch(fetchRoutines(user.uid))
    } catch (err) {
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

  return (
    <Container>
      <Header>
        <Body>
          <Title>Routines ({allRoutines.length})</Title>
        </Body>
      </Header>
      <Content
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <SearchForm style={styles.searchForm} onCreate={handleCreate} />
        {fetching ? (
          <Spinner color="black" />
        ) : (
          <View>
            {allRoutines.map((routine) => (
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
})
