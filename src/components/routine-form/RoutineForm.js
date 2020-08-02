import React from 'react'
import PropTypes from 'prop-types'
import {
  Alert,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native'
import {
  Button,
  Col,
  Content,
  Grid,
  H1,
  H2,
  Icon,
  Spinner,
  Text,
  View,
} from 'native-base'
import { Formik, getIn } from 'formik'
import { TextInput, IntegerInput } from '../form'
import ExerciseItem from './ExerciseItem'
import TimePicker from './pickers/TimePicker'
import Routine from '_api/models/Routine'
import RoutineExercise from '_api/models/RoutineExercise'

const RoutineForm = ({
  routine,
  isSubmitting,
  onQuit,
  onSubmit,
  submitText,
  autoFocus,
}) => {
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

  return (
    <Formik
      initialValues={routine || Routine.EMPTY}
      validationSchema={Routine.getSchema()}
      onSubmit={(attrs, opts) => {
        onSubmit(Routine.getSchema().cast(attrs), opts)
      }}
    >
      {({
        initialValues,
        handleChange,
        handleBlur,
        setValues,
        handleSubmit,
        values,
        touched,
        errors,
      }) => {
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
                  <H2 style={styles.h2}>Exercises ({exercises.length})</H2>

                  <Button
                    primary
                    onPress={() => {
                      setValues(
                        {
                          ...values,
                          exercises: values.exercises.concat(
                            RoutineExercise.EMPTY
                          ),
                        },
                        true
                      )
                    }}
                  >
                    <Text>+ Exercise</Text>
                  </Button>
                </View>
              </View>
            </TouchableWithoutFeedback>

            <Content
              contentContainerStyle={styles.middle}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="never"
            >
              {exercises.map((exercise, idx) => (
                <ExerciseItem
                  key={idx}
                  style={styles.exercise}
                  exercise={exercise}
                  visible={
                    JSON.stringify(exercise) ===
                    JSON.stringify(RoutineExercise.EMPTY)
                  }
                  onAdd={(exercise) => {
                    setValues(
                      {
                        ...values,
                        exercises: values.exercises
                          .filter((_, i) => i !== idx)
                          .concat(exercise),
                      },
                      true
                    )
                  }}
                  onUpdate={(exercise) => {
                    setValues(
                      {
                        ...values,
                        exercises: values.exercises.map((attr, i) =>
                          i === idx ? exercise : attr
                        ),
                      },
                      true
                    )
                  }}
                  onDelete={() => {
                    setValues(
                      {
                        ...values,
                        exercises: values.exercises.filter((_, i) => i !== idx),
                      },
                      true
                    )
                  }}
                />
              ))}
            </Content>

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
    height: 255,
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
  h2: {},
  icon: {
    fontSize: 36,
    color: 'black',
    fontWeight: 'bold',
  },
  submitBtn: {},
})
