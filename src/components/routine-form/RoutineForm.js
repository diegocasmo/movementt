import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native'
import { Col, Grid, H1, View } from 'native-base'
import { Button } from '_components/ui'
import { Formik } from 'formik'
import { TextField, IntegerField } from '../form'
import TimePicker from './pickers/TimePicker'
import { Routine, RoutineExercise } from '_models'
import RoutineExerciseForm from './RoutineExerciseForm'
import DraggableFlatList, {
  OpacityDecorator,
} from 'react-native-draggable-flatlist'

const RoutineForm = ({
  onAddExercises,
  routine,
  newlySelected,
  isSubmitting,
  onSubmit,
}) => {
  return (
    <Formik
      initialValues={routine || Routine.DEFAULT}
      validationSchema={Routine.SCHEMA}
      onSubmit={(values, opts) => {
        // Remove id of exercises that have been added/created
        const routine = {
          ...values,
          exercises_attributes: values.exercises.map((exercise) => {
            // eslint-disable-next-line no-unused-vars
            const { id, ...rest } = exercise

            return RoutineExercise.willCreate(exercise) ? rest : exercise
          }),
        }

        return onSubmit(Routine.SCHEMA.cast(routine), opts)
      }}
    >
      {(formik) => {
        // Listen to change and append newly selected exercises
        useEffect(() => {
          formik.setValues({
            ...formik.values,
            exercises: [...formik.values.exercises, ...newlySelected],
          })
        }, [newlySelected])

        const { exercises } = formik.values
        const activeExercises = exercises.filter(
          (x) => !RoutineExercise.willDestroy(x)
        )
        const exerciseCount = activeExercises.length
        const isValid =
          Object.keys(formik.errors).length === 0 && exerciseCount > 0

        const handleUpdateRoutineExercise = (idx, routineExercise, bag) => {
          const { setFieldValue } = bag

          setFieldValue(`exercises[${idx}]`, routineExercise)
        }

        const handleDeleteRoutineExercise = (idx, bag) => {
          const { setValues, values } = bag

          const exercises = Routine.isPeristed(routine)
            ? values.exercises.map((exercise, i) =>
                i === idx
                  ? { ...exercise, _create: false, _destroy: true }
                  : exercise
              )
            : values.exercises.filter((_, i) => i !== idx)

          setValues({ ...values, exercises }, true)
        }

        const handleDragEnd = (params, bag) => {
          const { data: routineExercises } = params
          const { setValues, values } = bag

          const exercises = routineExercises.map((exercise, idx) => ({
            ...exercise,
            position: idx,
          }))

          setValues(
            {
              ...values,
              exercises,
            },
            true
          )
        }

        return (
          <View style={styles.content}>
            <TouchableWithoutFeedback
              accessible={false}
              onPress={Keyboard.dismiss}
            >
              <View style={styles.top}>
                <Grid>
                  <Col flexGrow={1} paddingRight={10}>
                    <TextField label="Name" name="name" />
                  </Col>
                </Grid>
                <Grid>
                  <Col flexGrow={1} paddingRight={10}>
                    <IntegerField label="Rounds" name="rounds" />
                  </Col>
                  <Col flexGrow={1}>
                    <TimePicker
                      disabled={isSubmitting}
                      label="Round rest"
                      value={`${formik.values.rest_ms}`}
                      onChange={formik.handleChange('rest_ms')}
                    />
                  </Col>
                </Grid>

                <View style={styles.exercisesSetup}>
                  <H1>Exercises ({exerciseCount})</H1>

                  <Button
                    isDisabled={isSubmitting}
                    onPress={() => onAddExercises(activeExercises)}
                  >
                    + Add
                  </Button>
                </View>
              </View>
            </TouchableWithoutFeedback>

            <View style={styles.middle}>
              <DraggableFlatList
                data={exercises}
                keyExtractor={({ id, position }) => `${id}-${position}`}
                onDragEnd={(params) => {
                  handleDragEnd(params, formik)
                }}
                renderItem={({ item, index, drag, isActive }) => (
                  <OpacityDecorator>
                    <TouchableOpacity
                      onLongPress={() => {
                        drag()
                      }}
                      disabled={isSubmitting || isActive}
                    >
                      <RoutineExerciseForm
                        routineExercise={item}
                        disabled={isSubmitting || isActive}
                        onChange={(item) => {
                          handleUpdateRoutineExercise(index, item, formik)
                        }}
                        onDelete={() => {
                          handleDeleteRoutineExercise(index, formik)
                        }}
                      />
                    </TouchableOpacity>
                  </OpacityDecorator>
                )}
              />
            </View>

            <View style={styles.bottom}>
              <Button
                colorScheme="success"
                variant="block"
                isDisabled={!isValid}
                isLoading={isSubmitting}
                onPress={formik.handleSubmit}
              >
                {Routine.isPeristed(routine)
                  ? 'Update Routine'
                  : 'Create Routine'}
              </Button>
            </View>
          </View>
        )
      }}
    </Formik>
  )
}

RoutineForm.propTypes = {
  routine: PropTypes.object,
  newlySelected: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onAddExercises: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
}

export default RoutineForm

const styles = StyleSheet.create({
  content: {
    margin: 10,
    position: 'relative',
    flex: 1,
  },
  top: {
    height: 210,
  },
  middle: {
    flex: 1,
    marginBottom: 85,
  },
  bottom: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
  exercisesSetup: {
    marginTop: 10,
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
})
