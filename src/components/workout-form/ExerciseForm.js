import React from 'react'
import PropTypes from 'prop-types'
import { Modal, StyleSheet } from 'react-native'
import { View, Col, Grid, Button, Text } from 'native-base'
import {
  TextInput,
  IntegerInput,
  DecimalInput,
  ModalPickerInput,
} from '../form'
import { Formik, getIn } from 'formik'
import TimePicker from './TimePicker'
import Exercise from '../../api/models/Exercise'

const ExerciseForm = ({ visible, isUpdate, exercise, onClose, onSubmit }) => {
  const handleChangeQtyUnit = (quantityUnit, values, setValues) => {
    if (values.quantityUnit === quantityUnit) return

    setValues(
      {
        ...values,
        quantityUnit,
        ...(Exercise.isQtyUnitTime({ quantityUnit })
          ? {
              quantity: 15,
            }
          : {
              quantity: Exercise.EMPTY.quantity,
            }),
      },
      false
    )
  }

  return (
    <Formik
      initialValues={exercise}
      validationSchema={Exercise.getSchema()}
      onSubmit={(attrs, opts) => {
        onSubmit(Exercise.getSchema().cast(attrs), opts)
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        touched,
        values,
        setValues,
      }) => {
        const isValid = Object.keys(errors).length === 0

        return (
          <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
          >
            <View style={styles.container}>
              <View style={styles.modalView}>
                <Grid>
                  <Col flexGrow={1}>
                    <ModalPickerInput
                      label="Exercise type"
                      options={Exercise.QTY_UNIT_OPTS.map((opt, idx) => ({
                        key: idx,
                        ...opt,
                      }))}
                      onValueChange={(qtyUnit) => {
                        handleChangeQtyUnit(qtyUnit, values, setValues)
                      }}
                      value={values.quantityUnit}
                    />
                  </Col>
                </Grid>

                <Grid>
                  <Col flexGrow={1.5} paddingRight={10}>
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
                  <Col flexGrow={0.8}>
                    {Exercise.isQtyUnitTime(values) ? (
                      <TimePicker
                        label="Time"
                        allowNone={false}
                        value={`${values.quantity}`}
                        onChange={handleChange('quantity')}
                      />
                    ) : (
                      <IntegerInput
                        label="Reps"
                        error={getIn(errors, 'quantity')}
                        onBlur={handleBlur('quantity')}
                        onChange={handleChange('quantity')}
                        touched={getIn(touched, 'quantity')}
                        value={values.quantity}
                      />
                    )}
                  </Col>
                </Grid>

                <Grid>
                  <Col flexGrow={1} paddingRight={10}>
                    <DecimalInput
                      label={`Weight (${Exercise.WEIGHT_KG_UNIT})`}
                      error={getIn(errors, 'weight')}
                      onBlur={handleBlur('weight')}
                      onChange={handleChange('weight')}
                      touched={getIn(touched, 'weight')}
                      value={values.weight}
                    />
                  </Col>
                  <Col flexGrow={1}>
                    <TimePicker
                      label="Rest"
                      value={`${values.restSeconds}`}
                      onChange={handleChange('restSeconds')}
                    />
                  </Col>
                </Grid>

                <View style={styles.actions}>
                  <Button light onPress={onClose}>
                    <Text>Close</Text>
                  </Button>

                  <Button primary disabled={!isValid} onPress={handleSubmit}>
                    <Text>{isUpdate ? 'Update' : 'Add'} Exercise</Text>
                  </Button>
                </View>
              </View>
            </View>
          </Modal>
        )
      }}
    </Formik>
  )
}

ExerciseForm.propTypes = {
  exercise: PropTypes.object.isRequired,
  visible: PropTypes.bool.isRequired,
  isUpdate: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default ExerciseForm

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 100,
    marginBottom: 150,
    marginLeft: 25,
    marginRight: 25,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: 350,
    width: '100%',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
})
