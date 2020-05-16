import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { Button, Col, Form, Grid, H2, Icon, Text, View } from 'native-base'
import { TextInput, NumberInput, PickerInput } from '../../../components/form'
import { getIn } from 'formik'
import {
  EMPTY_EXERCISE,
  EXERCISE_TYPE_OPTIONS,
} from '../../../api/models/exercise'

const ExerciseForm = ({ remove, push, form }) => {
  const { values, errors, touched, handleBlur, handleChange } = form

  return (
    <Form>
      <H2 style={styles.h2}>Exercises ({values.exercises.length})</H2>

      {values.exercises.map((_, idx) => {
        const exercisePath = `exercises[${idx}]`

        return (
          <View style={styles.exerciseContainer} key={idx}>
            <Grid>
              <Col flexGrow={4} paddingRight={10}>
                <TextInput
                  label="Name"
                  error={getIn(errors, `${exercisePath}.name`)}
                  onBlur={handleBlur(`${exercisePath}.name`)}
                  onChange={handleChange(`${exercisePath}.name`)}
                  touched={getIn(touched, `${exercisePath}.name`)}
                  value={values.exercises[idx].name}
                />
              </Col>
              {idx !== 0 && (
                <Col alignItems="flex-end" justifyContent="center">
                  <Button
                    transparent
                    onPress={() => {
                      remove(idx)
                    }}
                  >
                    <Icon style={styles.removeIcon} active name="md-close" />
                  </Button>
                </Col>
              )}
            </Grid>

            <Grid>
              <Col paddingRight={10}>
                <NumberInput
                  label="Quantity"
                  error={getIn(errors, `${exercisePath}.quantity`)}
                  onBlur={handleBlur(`${exercisePath}.quantity`)}
                  onChange={handleChange(`${exercisePath}.quantity`)}
                  touched={getIn(touched, `${exercisePath}.quantity`)}
                  value={values.exercises[idx].quantity}
                />
              </Col>
              <Col paddingRight={10}>
                <PickerInput
                  label="Type"
                  value={values.exercises[idx].type}
                  options={EXERCISE_TYPE_OPTIONS}
                  onValueChange={handleChange(`${exercisePath}.type`)}
                />
              </Col>
              <Col>
                <NumberInput
                  label="Rest (sec)"
                  error={getIn(errors, `${exercisePath}.restSeconds`)}
                  onBlur={handleBlur(`${exercisePath}.restSeconds`)}
                  onChange={handleChange(`${exercisePath}.restSeconds`)}
                  touched={getIn(touched, `${exercisePath}.restSeconds`)}
                  value={values.exercises[idx].restSeconds}
                />
              </Col>
            </Grid>
          </View>
        )
      })}

      <Button
        block
        light
        style={styles.addBtn}
        onPress={() => {
          push(EMPTY_EXERCISE)
        }}
      >
        <Text>+ Add Exercise</Text>
      </Button>
    </Form>
  )
}

ExerciseForm.propTypes = {
  remove: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
}

const styles = StyleSheet.create({
  h2: {
    marginTop: 10,
    marginBottom: 10,
  },
  exerciseContainer: {
    marginBottom: 20,
  },
  removeIcon: {
    fontSize: 30,
    color: 'black',
  },
  addBtn: {
    marginTop: 20,
  },
})

export default ExerciseForm