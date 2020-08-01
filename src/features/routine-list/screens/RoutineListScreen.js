import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet } from 'react-native'
import {
  Body,
  Container,
  Content,
  Header,
  Spinner,
  Title,
  View,
} from 'native-base'
import MyRoutines from '../components/MyRoutines'
import ExampleRoutines from '../components/ExampleRoutines'
import { getUser } from '_state/reducers/auth'
import {
  fetchRoutines,
  isFetching,
  destroyRoutine,
} from '_state/reducers/routines'
import { showError } from '_utils/toast'

const RoutineListScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const user = useSelector(getUser)
  const fetching = useSelector(isFetching)

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
          <Title>Routines</Title>
        </Body>
      </Header>
      <Content
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {fetching ? (
          <Spinner color="black" />
        ) : (
          <View>
            <MyRoutines
              onStart={handleStart}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
              onCreateRoutine={handleCreate}
            />
            <ExampleRoutines onStart={handleStart} />
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
})
