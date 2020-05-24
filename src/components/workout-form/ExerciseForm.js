import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { Col, Grid, Card, CardItem } from 'native-base'
import { TextInput, NumberInput, PickerInput } from '../form'
import { getIn } from 'formik'
import Exercise from '../../api/models/Exercise'
import SwipeableRow from '../../components/SwipeableRow'

const ExerciseForm = ({ remove, form, autoFocus = false }) => {
  const { values, errors, touched, handleBlur, handleChange } = form

  return values.exercises.map((_, idx) => {
    const exercisePath = `exercises[${idx}]`

    return (
      <Card key={idx} style={styles.card}>
        <SwipeableRow onDelete={() => remove(idx)}>
          <CardItem>
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
                  label="Unit"
                  value={values.exercises[idx].quantityUnit}
                  options={Exercise.QTY_UNIT_OPTS}
                  onValueChange={handleChange(`${exercisePath}.quantityUnit`)}
                />
              </Col>
            </Grid>
          </CardItem>

          <CardItem>
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
          </CardItem>
        </SwipeableRow>
      </Card>
    )
  })
}

ExerciseForm.propTypes = {
  remove: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  autoFocus: PropTypes.bool,
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
  },
})

export default ExerciseForm
