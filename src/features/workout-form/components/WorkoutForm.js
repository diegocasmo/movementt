import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { Button, Col, Form, Grid, H1, Spinner, Text, View } from 'native-base'
import { Formik, getIn, FieldArray } from 'formik'
import { TextInput, NumberInput, PickerInput } from '../../../components/form'
import ExerciseForm from './ExerciseForm'
import {
  DIFFICULTY_OPTIONS,
  EMPTY_EXERCISE,
  VALIDATION_SCHEMA,
} from '../../../api/models/exercise'

const INITIAL_VALUES = {
  title: `${''}`,
  difficulty: 5,
  rounds: 4,
  restSeconds: 30,
  exercises: [EMPTY_EXERCISE],
}

const WorkoutForm = ({ isSubmitting, onSubmit, style }) => {
  return (
    <Formik
      initialValues={INITIAL_VALUES}
      validationSchema={VALIDATION_SCHEMA}
      onSubmit={onSubmit}
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

        return (
          <Form style={style}>
            <View>
              <H1 style={styles.h1}>Setup</H1>

              <Grid>
                <Col flexGrow={1.6} paddingRight={10}>
                  <TextInput
                    label="Title"
                    autoFocus={true}
                    error={getIn(errors, 'title')}
                    onBlur={handleBlur('title')}
                    onChange={handleChange('title')}
                    touched={getIn(touched, 'title')}
                    value={values.title}
                  />
                </Col>
                <Col>
                  <PickerInput
                    label="Difficulty"
                    value={values.difficulty}
                    options={DIFFICULTY_OPTIONS}
                    onValueChange={handleChange('difficulty')}
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
  onSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
}

export default WorkoutForm

const styles = StyleSheet.create({
  h1: {
    marginBottom: 10,
  },
  submitBtn: {
    marginTop: 20,
  },
})
