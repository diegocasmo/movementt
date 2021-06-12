import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { Button, H1, Icon, View, Text } from 'native-base'
import Modal from '_components/Modal'
import ExerciseList from '_components/ExerciseList'
import { useGetExercisesQuery } from '_state/services/exercise'
import { getExercises } from '_state/selectors/exercise'

const ExerciseListModal = ({ selected, onClose, onPress, visible }) => {
  const [query, setQuery] = useState('')
  const { data, isLoading } = useGetExercisesQuery()
  const exercises = getExercises(data, query)

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
        <H1 style={styles.h1}>
          Exercises ({isLoading ? 0 : exercises.length})
        </H1>
        <Button style={styles.closeBtn} transparent onPress={onClose}>
          <Icon style={styles.closeIcon} active name="md-close" />
        </Button>
      </View>
      <View style={styles.content}>
        <ExerciseList
          exercises={exercises}
          fetching={isLoading}
          onPress={onPress}
          onQueryChange={handleQueryChange}
          query={query}
          selected={selected}
        />
      </View>
      <View style={styles.footer}>
        <Button success block onPress={onClose}>
          <Text>Continue</Text>
        </Button>
      </View>
    </Modal>
  )
}

export default ExerciseListModal

ExerciseListModal.defaultProps = {
  selected: [],
}

ExerciseListModal.propTypes = {
  selected: PropTypes.array,
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
  content: {
    flex: 1,
  },
  footer: {},
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
