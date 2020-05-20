import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Alert } from 'react-native'
import {
  Button,
  Icon,
  Col,
  Form,
  Grid,
  H1,
  Spinner,
  Text,
  View,
} from 'native-base'
import { Formik, getIn, FieldArray } from 'formik'
import { TextInput, NumberInput } from '../../../components/form'
import ExerciseForm from './ExerciseForm'
import Workout from '../../../api/models/Workout'

const WorkoutForm = ({ isSubmitting, onQuit, onSubmit, style }) => {
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
      initialValues={Workout.EMPTY}
      validationSchema={Workout.getSchema()}
      validateOnMount={true}
      onSubmit={(attrs, opts) => {
        onSubmit(Workout.getSchema().cast(attrs), opts)
      }}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        touched,
        errors,
      }) => {
        const isValid = Object.keys(errors).length === 0
        const hasUnsavedChanges =
          JSON.stringify(values) !== JSON.stringify(Workout.EMPTY)

        return (
          <Form style={[styles.form, style]}>
            <View>
              <H1 style={styles.h1}>Setup</H1>
              <Button
                transparent
                style={styles.btnClose}
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

              <Grid>
                <Col>
                  <TextInput
                    label="Name"
                    autoFocus={true}
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

            <FieldArray name="exercises" component={ExerciseForm} />

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
                <Text>Create</Text>
              )}
            </Button>
          </Form>
        )
      }}
    </Formik>
  )
}

WorkoutForm.propTypes = {
  style: PropTypes.object,
  onQuit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
}

export default WorkoutForm

const styles = StyleSheet.create({
  form: {
    width: '100%',
    position: 'relative',
  },
  btnClose: {
    position: 'absolute',
    top: -8,
    right: 0,
  },
  icon: {
    fontSize: 36,
    color: 'black',
    fontWeight: 'bold',
  },
  h1: {
    marginBottom: 10,
  },
  submitBtn: {
    marginTop: 20,
  },
})
