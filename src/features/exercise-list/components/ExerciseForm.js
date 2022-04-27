import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { View, H1, Grid, Col } from 'native-base'
import { Button } from '_components/ui'
import { Formik } from 'formik'
import Modal from '_components/Modal'
import { TextField, ModalPickerInput } from '_components/form'
import { Exercise } from '_models'

const ExerciseForm = ({
  exercise,
  isSubmitting,
  onCancel,
  onSubmit,
  visible,
}) => {
  return (
    <Formik
      initialValues={exercise}
      validationSchema={Exercise.SCHEMA}
      onSubmit={(values, opts) => {
        onSubmit(Exercise.SCHEMA.cast(values), opts)
      }}
    >
      {(formik) => {
        const isValid = Object.keys(formik.errors).length === 0

        return (
          <Modal visible={visible} onRequestClose={onCancel}>
            <H1 style={styles.h1}>
              {exercise.created_at ? 'Update' : 'Create'} Exercise
            </H1>

            <Grid>
              <Col flexGrow={1}>
                <TextField label="Name" name="name" autoFocus={true} />
              </Col>
            </Grid>

            <Grid>
              <Col flexGrow={1}>
                <ModalPickerInput
                  label="Movement type"
                  options={Exercise.MOVEMENT_TYPE_OPTS}
                  onValueChange={formik.handleChange('movement_type')}
                  value={formik.values.movement_type}
                  disabled={isSubmitting}
                />
              </Col>
            </Grid>

            <View style={styles.actions}>
              <Button colorScheme="light" style={styles.btn} onPress={onCancel}>
                Cancel
              </Button>

              <Button
                style={styles.btn}
                isDisabled={!isValid}
                isLoading={isSubmitting}
                onPress={formik.handleSubmit}
              >
                {exercise.created_at ? 'Update' : 'Create'}
              </Button>
            </View>
          </Modal>
        )
      }}
    </Formik>
  )
}

ExerciseForm.propTypes = {
  exercise: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onSubmitFulfilled: PropTypes.func,
  onSubmitRejected: PropTypes.func,
  isSubmitting: PropTypes.bool.isRequired,
  visible: PropTypes.bool.isRequired,
}

export default ExerciseForm

const styles = StyleSheet.create({
  h1: {
    marginRight: 'auto',
    marginLeft: 'auto',
    marginBottom: 20,
  },
  actions: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btn: {
    width: '40%',
    justifyContent: 'center',
  },
})
