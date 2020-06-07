import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { View, Text, Card, CardItem, Body } from 'native-base'
import Exercise from '../../api/models/Exercise'
import ExerciseActions from './ExerciseActions'
import ExerciseForm from './ExerciseForm'
import { getFormattedDuration } from '../../utils/time-utils'

const ExerciseItem = ({
  visible = false,
  exercise,
  style,
  onAdd,
  onUpdate,
  onDelete,
}) => {
  const [state, setState] = useState({ visible, isUpdate: false })

  const handleSubmit = (exercise) => {
    if (state.isUpdate) {
      onUpdate(exercise)
    } else {
      onAdd(exercise)
    }

    setState({ ...state, visible: false, isUpdate: false })
  }

  const handleClose = () => {
    if (!state.isUpdate) {
      onDelete()
    }

    setState({ ...state, visible: false, isUpdate: false })
  }

  return (
    <View>
      <ExerciseForm
        visible={state.visible}
        isUpdate={state.isUpdate}
        exercise={exercise}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
      <Card style={[styles.card, style]}>
        <CardItem header style={styles.header}>
          <View style={styles.name}>
            <Text numberOfLines={1}>{exercise.name}</Text>
          </View>
          <View style={styles.actions}>
            <ExerciseActions
              exercise={exercise}
              onUpdate={() => {
                setState({
                  ...state,
                  visible: true,
                  isUpdate: true,
                })
              }}
              onDelete={onDelete}
            />
          </View>
        </CardItem>
        <CardItem>
          <Body style={styles.body}>
            <Text>{Exercise.getInstructions(exercise)}</Text>
            <Text>Rest: {getFormattedDuration(exercise.restSeconds)}</Text>
          </Body>
        </CardItem>
      </Card>
    </View>
  )
}

ExerciseItem.propTypes = {
  style: PropTypes.object,
  visible: PropTypes.bool,
  exercise: PropTypes.object.isRequired,
  onAdd: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default ExerciseItem

const styles = StyleSheet.create({
  card: {
    position: 'relative',
  },
  header: {
    paddingBottom: 0,
  },
  name: {
    maxWidth: '90%',
  },
  actions: {
    position: 'absolute',
    top: 0,
    right: -2,
    width: 40,
    height: 40,
  },
  body: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
})
