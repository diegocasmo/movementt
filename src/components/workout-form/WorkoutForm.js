import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native'
import {
  Button,
  Col,
  Content,
  Form,
  Grid,
  H1,
  H2,
  Icon,
  Spinner,
  Text,
  View,
} from 'native-base'
import { Formik, getIn, FieldArray } from 'formik'
import { TextInput, NumberInput } from '../form'
import ExerciseForm from './ExerciseForm'
import Workout from '../../api/models/Workout'
import Exercise from '../../api/models/Exercise'

const WorkoutForm = ({
  workout,
  isSubmitting,
  onQuit,
  onSubmit,
  submitText,
  autoFocus,
}) => {
  const confirmQuit = () => {
    Alert.alert(
      'Leave Workout',
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
      initialValues={workout || Workout.EMPTY}
      validationSchema={Workout.getSchema()}
      validateOnMount={false}
      onSubmit={(attrs, opts) => {
        onSubmit(Workout.getSchema().cast(attrs), opts)
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
        const isValid = Object.keys(errors).length === 0
        const hasUnsavedChanges =
          JSON.stringify(values) !== JSON.stringify(initialValues)

        return (
          <TouchableWithoutFeedback
            accessible={false}
            onPress={Keyboard.dismiss}
          >
            <Form style={styles.content}>
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
                    <NumberInput
                      error={getIn(errors, 'rounds')}
                      onBlur={handleBlur('rounds')}
                      onChange={handleChange('rounds')}
                      touched={getIn(touched, 'rounds')}
                      value={values.rounds}
                      label="Rounds"
                    />
                  </Col>
                  <Col>
                    <NumberInput
                      error={getIn(errors, 'restSeconds')}
                      onBlur={handleBlur('restSeconds')}
                      onChange={handleChange('restSeconds')}
                      touched={getIn(touched, 'restSeconds')}
                      value={values.restSeconds}
                      label="Round rest (sec)"
                    />
                  </Col>
                </Grid>
              </View>

              <View style={styles.exercisesSetup}>
                <H2 style={styles.h2}>Exercises ({values.exercises.length})</H2>

                <Button
                  light
                  onPress={() => {
                    const exercises = [...values.exercises, Exercise.EMPTY]
                    setValues({ ...values, exercises }, false)
                  }}
                >
                  <Text>+ Add Exercise</Text>
                </Button>
              </View>

              <Content
                contentContainerStyle={styles.middle}
                enableResetScrollToCoords={false}
                showsVerticalScrollIndicator={false}
              >
                <FieldArray
                  name="exercises"
                  render={(props) => (
                    <ExerciseForm {...props} autoFocus={autoFocus} />
                  )}
                />
              </Content>

              <View style={styles.bottom}>
                <Button
                  block
                  primary
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
            </Form>
          </TouchableWithoutFeedback>
        )
      }}
    </Formik>
  )
}

WorkoutForm.defaultProps = {
  autoFocus: false,
  submitText: 'Create Workout',
}

WorkoutForm.propTypes = {
  workout: PropTypes.object,
  autoFocus: PropTypes.bool,
  submitText: PropTypes.string,
  onQuit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
}

export default WorkoutForm

const styles = StyleSheet.create({
  content: {
    margin: 10,
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  top: {
    height: 200,
    marginBottom: 10,
  },
  middle: {
    minHeight: '100%',
    paddingBottom: 75,
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    marginBottom: 10,
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
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  h2: {},
  icon: {
    fontSize: 36,
    color: 'black',
    fontWeight: 'bold',
  },
  submitBtn: {
    marginTop: 20,
    marginBottom: 20,
  },
})
