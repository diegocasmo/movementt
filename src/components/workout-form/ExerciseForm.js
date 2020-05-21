import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { Button, Col, Form, Grid, H2, Text, View } from 'native-base'
import { TextInput, NumberInput, PickerInput } from '../form'
import { getIn } from 'formik'
import Exercise from '../../api/models/Exercise'
import SwipeableRow from '../../components/SwipeableRow'

const ExerciseForm = ({ remove, push, form, autoFocus }) => {
  const { values, errors, touched, handleBlur, handleChange } = form

  return (
    <Form style={styles.form}>
      <H2 style={styles.h2}>Exercises ({values.exercises.length})</H2>

      {values.exercises.map((_, idx) => {
        const exercisePath = `exercises[${idx}]`

        return (
          <SwipeableRow
            key={idx}
            style={styles.listItem}
            onDelete={() => remove(idx)}
          >
            <View style={styles.content}>
              <Grid>
                <Col flexGrow={2} paddingRight={10}>
                  <TextInput
                    label="Name"
                    autoFocus={autoFocus}
                    error={getIn(errors, `${exercisePath}.name`)}
                    onBlur={handleBlur(`${exercisePath}.name`)}
                    onChange={handleChange(`${exercisePath}.name`)}
                    touched={getIn(touched, `${exercisePath}.name`)}
                    value={values.exercises[idx].name}
                  />
                </Col>
                <Col flexGrow={0.8} paddingRight={10}>
                  <NumberInput
                    label="Quantity"
                    error={getIn(errors, `${exercisePath}.quantity`)}
                    onBlur={handleBlur(`${exercisePath}.quantity`)}
                    onChange={handleChange(`${exercisePath}.quantity`)}
                    touched={getIn(touched, `${exercisePath}.quantity`)}
                    value={values.exercises[idx].quantity}
                  />
                </Col>
                <Col flexGrow={0.8}>
                  <PickerInput
                    label=" "
                    value={values.exercises[idx].quantityUnit}
                    options={Exercise.QTY_UNIT_OPTS}
                    onValueChange={handleChange(`${exercisePath}.quantityUnit`)}
                  />
                </Col>
              </Grid>

              <Grid>
                <Col flexGrow={1} paddingRight={10}>
                  <NumberInput
                    label={`Weight (${Exercise.WEIGHT_KG_UNIT})`}
                    error={getIn(errors, `${exercisePath}.weight`)}
                    onBlur={handleBlur(`${exercisePath}.weight`)}
                    onChange={handleChange(`${exercisePath}.weight`)}
                    touched={getIn(touched, `${exercisePath}.weight`)}
                    value={values.exercises[idx].weight}
                  />
                </Col>
                <Col flexGrow={1}>
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
          </SwipeableRow>
        )
      })}

      <Button
        block
        light
        style={styles.addBtn}
        onPress={() => {
          push(Exercise.EMPTY)
        }}
      >
        <Text>+ Add Exercise</Text>
      </Button>
    </Form>
  )
}

ExerciseForm.defaultProps = {
  autoFocus: false,
}

ExerciseForm.propTypes = {
  remove: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  autoFocus: PropTypes.bool,
}

const styles = StyleSheet.create({
  form: {},
  h2: {
    marginTop: 10,
    marginBottom: 10,
  },
  listItem: {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  content: {
    marginTop: 10,
    marginBottom: 20,
  },
  removeIcon: {
    fontSize: 30,
    color: 'black',
  },
  addBtn: {
    marginTop: 10,
  },
})

export default ExerciseForm
