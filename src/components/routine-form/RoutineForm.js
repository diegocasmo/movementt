import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Alert,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native'
import { Button, Col, Grid, H1, Icon, Spinner, Text, View } from 'native-base'
import { useFormik, getIn } from 'formik'
import { TextInput, IntegerInput } from '../form'
import TimePicker from './pickers/TimePicker'
import { Routine, RoutineExercise } from '_api'
import ExerciseListModal from './ExerciseListModal'
import RoutineExerciseForm from './RoutineExerciseForm'
import DraggableFlatList from 'react-native-draggable-flatlist'
import { showError } from '_utils/toast'

const RoutineForm = ({
  routine,
  isSubmitting,
  onQuit,
  onSubmit,
  submitText,
  autoFocus,
}) => {
  const [isVisible, setIsVisible] = useState(false)

  const confirmQuit = () => {
    Alert.alert(
      'Leave Routine',
      'You have unsaved changes. Are you sure you want to leave?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            onQuit()
          },
        },
      ],
      { cancelable: false }
    )
  }

  const handleShowExercises = () => {
    setIsVisible(true)
  }

  const handleCloseExercises = () => {
    setIsVisible(false)
  }

  const handleAddExercise = async (exercise, bag) => {
    const { setValues, values } = bag

    try {
      handleCloseExercises()
      const routineExercise = await RoutineExercise.build({
        ...exercise,
        position: values.exercises.length,
      })

      setValues(
        {
          ...values,
          exercises: values.exercises.concat(routineExercise),
        },
        true
      )
    } catch (err) {
      showError(err.message)
    }
  }

  const handleUpdateRoutineExercise = (idx, routineExercise, bag) => {
    const { setValues, values } = bag

    setValues(
      {
        ...values,
        exercises: values.exercises.map((attr, i) =>
          i === idx ? routineExercise : attr
        ),
      },
      true
    )
  }

  const handleDeleteRoutineExercise = (idx, bag) => {
    const { setValues, values } = bag

    setValues(
      {
        ...values,
        exercises: values.exercises.filter((_, i) => i !== idx),
      },
      true
    )
  }

  const handleDragEnd = (params, bag) => {
    const { data: routineExercises, to } = params
    const { setValues, values } = bag

    const exercises = routineExercises.map((exercise, idx) => {
      if (idx !== to) return exercise

      return {
        ...exercise,
        position: to,
      }
    })

    setValues(
      {
        ...values,
        exercises,
      },
      true
    )
  }

  const formik = useFormik({
    initialValues: routine || Routine.DEFAULT,
    validationSchema: Routine.SCHEMA,
    onSubmit: (attrs, opts) => {
      onSubmit(Routine.SCHEMA.cast(attrs), opts)
    },
  })

  const { exercises } = formik.values
  const isValid = Object.keys(formik.errors).length === 0
  const hasUnsavedChanges =
    JSON.stringify(formik.values) !== JSON.stringify(formik.initialValues)

  return (
    <View style={styles.content}>
      <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss}>
        <View style={styles.top}>
          <View style={styles.setup}>
            <H1 style={styles.h1}>Setup</H1>
            <Button
              transparent
              onPress={() => {
                if (hasUnsavedChanges) {
                  confirmQuit()
                } else {
                  onQuit()
                }
              }}
            >
              <Icon style={styles.icon} active name="md-close" />
            </Button>
          </View>

          <Grid>
            <Col>
              <TextInput
                label="Name"
                autoFocus={autoFocus}
                disabled={isSubmitting}
                error={getIn(formik.errors, 'name')}
                onBlur={formik.handleBlur('name')}
                onChange={formik.handleChange('name')}
                touched={getIn(formik.touched, 'name')}
                value={formik.values.name}
              />
            </Col>
          </Grid>
          <Grid>
            <Col paddingRight={10}>
              <IntegerInput
                value={formik.values.rounds}
                label="Rounds"
                disabled={isSubmitting}
                error={getIn(formik.errors, 'rounds')}
                onBlur={formik.handleBlur('rounds')}
                onChange={formik.handleChange('rounds')}
                touched={getIn(formik.touched, 'rounds')}
              />
            </Col>
            <Col>
              <TimePicker
                disabled={isSubmitting}
                label="Round rest"
                value={`${formik.values.rest_seconds}`}
                onChange={formik.handleChange('rest_seconds')}
              />
            </Col>
          </Grid>

          <View style={styles.exercisesSetup}>
            <H1 style={styles.h1}>Exercises ({exercises.length})</H1>

            <Button
              primary
              disabled={isSubmitting}
              onPress={handleShowExercises}
            >
              <Text>+ Add</Text>
            </Button>
          </View>
        </View>
      </TouchableWithoutFeedback>

      <ExerciseListModal
        onClose={handleCloseExercises}
        onPress={(exercise) => {
          handleAddExercise(exercise, formik)
        }}
        visible={isVisible}
      />

      <DraggableFlatList
        contentContainerStyle={styles.middle}
        data={exercises}
        renderItem={({ item, index, drag, isActive }) => {
          return (
            <TouchableOpacity
              style={{ opacity: isActive ? 0.5 : 1 }}
              activeOpacity={0.5}
              onLongPress={drag}
              disabled={isSubmitting}
            >
              <RoutineExerciseForm
                routineExercise={item}
                disabled={isSubmitting}
                onChange={(item) => {
                  handleUpdateRoutineExercise(index, item, formik)
                }}
                onDelete={() => {
                  handleDeleteRoutineExercise(index, formik)
                }}
              />
            </TouchableOpacity>
          )
        }}
        keyExtractor={(data) => `draggable-item-${data.id}`}
        onDragEnd={(params) => {
          handleDragEnd(params, formik)
        }}
      />

      <View style={styles.bottom}>
        <Button
          block
          success
          style={styles.submitBtn}
          disabled={isSubmitting || !isValid}
          onPress={formik.handleSubmit}
        >
          {isSubmitting ? (
            <Spinner color="white" size="small" />
          ) : (
            <Text>{submitText}</Text>
          )}
        </Button>
      </View>
    </View>
  )
}

RoutineForm.defaultProps = {
  autoFocus: false,
  submitText: 'Create Routine',
}

RoutineForm.propTypes = {
  routine: PropTypes.object,
  autoFocus: PropTypes.bool,
  submitText: PropTypes.string,
  onQuit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
}

export default RoutineForm

const styles = StyleSheet.create({
  content: {
    position: 'relative',
    margin: 10,
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  top: {
    height: 245,
  },
  middle: {
    paddingBottom: 50,
  },
  bottom: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
  setup: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  h1: {
    marginBottom: 10,
  },
  exercisesSetup: {
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  exercise: {
    marginBottom: 10,
  },
  icon: {
    fontSize: 36,
    color: 'black',
    fontWeight: 'bold',
  },
  submitBtn: {},
})
