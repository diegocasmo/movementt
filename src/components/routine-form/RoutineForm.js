import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native'
import { Button, Col, Grid, H1, Spinner, Text, View } from 'native-base'
import { useFormik, getIn } from 'formik'
import { TextInput, IntegerInput } from '../form'
import TimePicker from './pickers/TimePicker'
import { Routine, RoutineExercise } from '_api'
import RoutineExerciseForm from './RoutineExerciseForm'
import DraggableFlatList from 'react-native-draggable-flatlist'

const RoutineForm = ({
  onAddExercises,
  routine,
  newlySelected,
  isSubmitting,
  onSubmit,
}) => {
  const formik = useFormik({
    initialValues: routine || Routine.DEFAULT,
    validationSchema: Routine.SCHEMA,
    onSubmit: (values, opts) => {
      // Remove id of exercises that have been added/created
      const routine = {
        ...values,
        exercises: values.exercises.map((exercise) => {
          const { id, ...rest } = exercise

          return RoutineExercise.willCreate(exercise) ? rest : { id, ...rest }
        }),
      }

      return onSubmit(Routine.SCHEMA.cast(routine), opts)
    },
  })

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
  const isValid = Object.keys(formik.errors).length === 0 && exerciseCount > 0

  const handleUpdateRoutineExercise = (idx, routineExercise, bag) => {
    const { setFieldValue } = bag

    setFieldValue(`exercises[${idx}]`, routineExercise)
  }

  const handleDeleteRoutineExercise = (idx, bag) => {
    const { setValues, values } = bag

    const exercises = Routine.isPeristed(routine)
      ? values.exercises.map((exercise, i) =>
          i === idx ? { ...exercise, _create: false, _destroy: true } : exercise
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
      <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss}>
        <View style={styles.top}>
          <Grid>
            <Col flexGrow={1} paddingRight={10}>
              <TextInput
                label="Name"
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
            <Col flexGrow={1} paddingRight={10}>
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
            <Col flexGrow={1}>
              <TimePicker
                disabled={isSubmitting}
                label="Round rest"
                value={`${formik.values.rest_seconds}`}
                onChange={formik.handleChange('rest_seconds')}
              />
            </Col>
          </Grid>

          <View style={styles.exercisesSetup}>
            <H1>Exercises ({exerciseCount})</H1>

            <Button
              primary
              disabled={isSubmitting}
              onPress={() => onAddExercises(activeExercises)}
            >
              <Text>+ Add</Text>
            </Button>
          </View>
        </View>
      </TouchableWithoutFeedback>

      <View style={styles.middle}>
        <DraggableFlatList
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
          keyExtractor={({ id, position }) => `${id}-${position}`}
          onDragEnd={(params) => {
            handleDragEnd(params, formik)
          }}
        />
      </View>

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
            <Text>
              {Routine.isPeristed(routine)
                ? 'Update Routine'
                : 'Create Routine'}
            </Text>
          )}
        </Button>
      </View>
    </View>
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
    marginBottom: 65,
  },
  bottom: {
    position: 'absolute',
    bottom: 10,
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
  submitBtn: {},
})
