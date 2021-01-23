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
import { Formik, getIn } from 'formik'
import { TextInput, IntegerInput } from '../form'
import TimePicker from './pickers/TimePicker'
import { ROUTINE_SCHEMA, DEFAULT_ROUTINE } from '_api/routine'
import { buildRoutineExercise } from '_api/routine-exercise'
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
      const routineExercise = await buildRoutineExercise(exercise)

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

  const handleDragEnd = (routineExercises, bag) => {
    const { setValues, values } = bag

    setValues(
      {
        ...values,
        exercises: routineExercises,
      },
      true
    )
  }

  return (
    <Formik
      initialValues={routine || DEFAULT_ROUTINE}
      validationSchema={ROUTINE_SCHEMA}
      onSubmit={(attrs, opts) => {
        onSubmit(ROUTINE_SCHEMA.cast(attrs), opts)
      }}
    >
      {(bag) => {
        const {
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          initialValues,
          touched,
          values,
        } = bag
        const { exercises } = values
        const isValid = Object.keys(errors).length === 0
        const hasUnsavedChanges =
          JSON.stringify(values) !== JSON.stringify(initialValues)

        return (
          <View style={styles.content}>
            <TouchableWithoutFeedback
              accessible={false}
              onPress={Keyboard.dismiss}
            >
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
                      error={getIn(errors, 'name')}
                      onBlur={handleBlur('name')}
                      onChange={handleChange('name')}
                      touched={getIn(touched, 'name')}
                      value={values.name}
                    />
                  </Col>
                </Grid>
                <Grid>
                  <Col paddingRight={10}>
                    <IntegerInput
                      error={getIn(errors, 'rounds')}
                      onBlur={handleBlur('rounds')}
                      onChange={handleChange('rounds')}
                      touched={getIn(touched, 'rounds')}
                      value={values.rounds}
                      label="Rounds"
                    />
                  </Col>
                  <Col>
                    <TimePicker
                      label="Round rest"
                      value={`${values.restSeconds}`}
                      onChange={handleChange('restSeconds')}
                    />
                  </Col>
                </Grid>

                <View style={styles.exercisesSetup}>
                  <H1 style={styles.h1}>Exercises ({exercises.length})</H1>

                  <Button primary onPress={handleShowExercises}>
                    <Text>+ Add</Text>
                  </Button>
                </View>
              </View>
            </TouchableWithoutFeedback>

            <ExerciseListModal
              onClose={handleCloseExercises}
              onPress={(exercise) => {
                handleAddExercise(exercise, bag)
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
                  >
                    <RoutineExerciseForm
                      routineExercise={item}
                      onChange={(item) => {
                        handleUpdateRoutineExercise(index, item, bag)
                      }}
                      onDelete={() => {
                        handleDeleteRoutineExercise(index, bag)
                      }}
                    />
                  </TouchableOpacity>
                )
              }}
              keyExtractor={(data) => `draggable-item-${data.uid}`}
              onDragEnd={({ data }) => {
                handleDragEnd(data, bag)
              }}
            />

            <View style={styles.bottom}>
              <Button
                block
                success
                style={styles.submitBtn}
                disabled={isSubmitting || !isValid}
                onPress={handleSubmit}
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
      }}
    </Formik>
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
