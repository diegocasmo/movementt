import React from 'react'
import PropTypes from 'prop-types'
import { Modal, StyleSheet } from 'react-native'
import { View, Button, Text } from 'native-base'
import { ModalPickerInput } from '../form'
import { Formik } from 'formik'
import RepsExerciseForm from './exercise-types/RepsExerciseForm'
import TimeExerciseForm from './exercise-types/TimeExerciseForm'
import DistanceExerciseForm from './exercise-types/DistanceExerciseForm'
import { CATEGORY_DISTANCE, CATEGORY_TIME, CATEGORY_OPTS } from '_api/exercise'
import {
  DISTANCE_UNIT,
  REP_UNIT,
  ROUTINE_EXERCISE_SCHEMA,
  TIME_UNIT,
} from '_api/routine-exercise'

const ExerciseForm = ({ visible, isUpdate, exercise, onClose, onSubmit }) => {
  const renderExerciseForm = (type, bag) => {
    const props = {
      errors: bag.errors,
      handleBlur: bag.handleBlur,
      handleChange: bag.handleChange,
      touched: bag.touched,
      values: bag.values,
    }

    switch (type) {
      case CATEGORY_TIME:
        return <TimeExerciseForm {...props} />
      case CATEGORY_DISTANCE:
        return <DistanceExerciseForm {...props} />
      default:
        return <RepsExerciseForm {...props} />
    }
  }

  const handleTypeChange = (type, values, setValues) => {
    if (values.type === type) return

    const changes = ((type) => {
      switch (type) {
        case CATEGORY_TIME:
          return { quantity: 15, quantityUnit: TIME_UNIT }
        case CATEGORY_DISTANCE:
          return { quantity: 200, quantityUnit: DISTANCE_UNIT }
        default:
          return { quantity: 10, quantityUnit: REP_UNIT }
      }
    })(type)

    setValues({ ...values, type, ...changes }, false)
  }

  return (
    <Formik
      initialValues={exercise}
      validationSchema={ROUTINE_EXERCISE_SCHEMA}
      onSubmit={(attrs, opts) => {
        onSubmit(ROUTINE_EXERCISE_SCHEMA.cast(attrs), opts)
      }}
    >
      {(bag) => {
        const { errors, handleSubmit, setValues, values } = bag
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
                <View style={styles.typeContainer}>
                  <ModalPickerInput
                    label="Exercise type"
                    options={CATEGORY_OPTS.map((opt, idx) => ({
                      key: idx,
                      ...opt,
                    }))}
                    onValueChange={(type) => {
                      handleTypeChange(type, values, setValues)
                    }}
                    value={values.type}
                  />
                </View>

                {renderExerciseForm(values.type, bag)}

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
  typeContainer: {
    marginBottom: 20,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
})
