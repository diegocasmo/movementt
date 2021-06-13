import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { Button, H1, Icon, View, Text, Spinner } from 'native-base'
import Modal from '_components/Modal'
import ExerciseList from '_components/ExerciseList'
import { useGetExercisesQuery } from '_state/services/exercise'
import { getExercises } from '_state/selectors/exercise'
import { showError } from '_utils/toast'

const ExerciseListModal = ({ selectedIds = [], onClose, visible }) => {
  const [query, setQuery] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedExercises, setSelectedExercises] = useState([])
  const { data, isLoading } = useGetExercisesQuery()
  const exercises = getExercises(data, query)
  const allSelectedIds = [...selectedIds, ...selectedExercises.map((x) => x.id)]

  // Must wait until `isSubmitting` is true and only then execute
  // submission logic, otherwise spinners won't show
  useEffect(() => {
    handleExecuteSubmit()
  }, [isSubmitting])

  const handleExecuteSubmit = async () => {
    if (!isSubmitting) return

    try {
      await onClose(selectedExercises)
      setSelectedExercises([])
    } catch (err) {
      showError(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleQueryChange = (query) => {
    setQuery(query)
  }

  const handlePress = (exercise) => {
    setSelectedExercises([...selectedExercises, exercise])
  }

  const handleStartSubmit = async () => {
    setIsSubmitting(true)
  }

  return (
    <Modal
      containerStyle={styles.container}
      childrenStyle={styles.children}
      visible={visible}
      onRequestClose={handleStartSubmit}
    >
      <View style={styles.header}>
        <H1 style={styles.h1}>
          Exercises ({isLoading ? 0 : exercises.length})
        </H1>
        <Button
          transparent
          disabled={isSubmitting}
          style={styles.closeBtn}
          onPress={handleStartSubmit}
        >
          {isSubmitting ? (
            <Spinner color="black" size="small" />
          ) : (
            <Icon style={styles.closeIcon} active name="md-close" />
          )}
        </Button>
      </View>
      <View style={styles.content}>
        <ExerciseList
          exercises={exercises}
          fetching={isLoading}
          onPress={handlePress}
          onQueryChange={handleQueryChange}
          query={query}
          selectedIds={allSelectedIds}
        />
      </View>
      <View style={styles.footer}>
        <Button
          primary
          block
          disabled={isSubmitting}
          onPress={handleStartSubmit}
        >
          {isSubmitting ? (
            <Spinner color="white" size="small" />
          ) : (
            <Text>Continue</Text>
          )}
        </Button>
      </View>
    </Modal>
  )
}

export default ExerciseListModal

ExerciseListModal.propTypes = {
  selectedIds: PropTypes.array,
  onClose: PropTypes.func.isRequired,
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
