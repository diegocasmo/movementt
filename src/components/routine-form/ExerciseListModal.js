import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { Button, H1, Icon, View } from 'native-base'
import Modal from '_components/Modal'
import ExerciseList from '_components/ExerciseList'
import { useExercises } from '_hooks/use-exercises'

const ExerciseListModal = ({ onClose, onPress, visible }) => {
  const [query, setQuery] = useState('')
  const { getExercises, loading } = useExercises(query)
  const exercises = getExercises()

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
        <H1 style={styles.h1}>Exercises ({loading ? 0 : exercises.length})</H1>
        <Button style={styles.closeBtn} transparent onPress={onClose}>
          <Icon style={styles.closeIcon} active name="md-close" />
        </Button>
      </View>
      <ExerciseList
        exercises={exercises}
        fetching={loading}
        onPress={onPress}
        onQueryChange={handleQueryChange}
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
