import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet } from 'react-native'
import { unwrapResult } from '@reduxjs/toolkit'
import { Button, H1, Icon, View } from 'native-base'
import { getUser } from '_state/reducers/auth'
import {
  fetchExercises,
  getExercises,
  isFetching,
} from '_state/reducers/exercises'
import { showError } from '_utils/toast'
import { search } from '_utils/fuzzy-search'
import Modal from '_components/Modal'
import ExerciseList from '_components/ExerciseList'
import * as seed from '_seed/exercises.json'

const ExerciseListModal = ({ onClose, onPress, visible }) => {
  const dispatch = useDispatch()
  const user = useSelector(getUser)
  const fetching = useSelector(isFetching)
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

  const handleQueryChange = (query) => {
    setQuery(query)
  }

  return (
    <Modal
      containerStyle={styles.container}
      childrenStyle={styles.children}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.header}>
        <H1 style={styles.h1}>Exercises ({fetching ? 0 : exercises.length})</H1>
        <Button style={styles.closeBtn} transparent onPress={onClose}>
          <Icon style={styles.closeIcon} active name="md-close" />
        </Button>
      </View>
      <ExerciseList
        exercises={exercises}
        fetching={fetching}
        onQueryChange={handleQueryChange}
        onPress={onPress}
        query={query}
      />
    </Modal>
  )
}

export default ExerciseListModal

ExerciseListModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onPress: PropTypes.func.isRequired,
  visible: PropTypes.bool,
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 50,
  },
  children: {
    paddingLeft: 10,
    paddingRight: 10,
    height: '90%',
  },
  header: {
    position: 'relative',
  },
  h1: {
    marginBottom: 10,
    textAlign: 'center',
  },
  closeBtn: {
    position: 'absolute',
    top: -7,
    right: 0,
  },
  closeIcon: {
    fontSize: 36,
    color: 'black',
    fontWeight: 'bold',
  },
})
