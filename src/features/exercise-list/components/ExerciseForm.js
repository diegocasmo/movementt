import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { View, H1, Grid, Col } from 'native-base'
import { Button } from '_components/ui/Button'
import { useFormik, getIn } from 'formik'
import Modal from '_components/Modal'
import { TextInput, ModalPickerInput } from '_components/form'
import { Exercise } from '_api'

const ExerciseForm = ({
  exercise,
  isSubmitting,
  onCancel,
  onSubmit,
  visible,
}) => {
  const formik = useFormik({
    initialValues: exercise,
    validationSchema: Exercise.SCHEMA,
    onSubmit: (values, opts) => {
      onSubmit(Exercise.SCHEMA.cast(values), opts)
    },
  })

  const isValid = Object.keys(formik.errors).length === 0

  return (
    <Modal visible={visible} onRequestClose={onCancel}>
      <H1 style={styles.h1}>
        {exercise.created_at ? 'Update' : 'Create'} Exercise
      </H1>

      <Grid>
        <Col flexGrow={1}>
          <TextInput
            label="Name"
            autoFocus={true}
            error={getIn(formik.errors, 'name')}
            onBlur={formik.handleBlur('name')}
            onChange={formik.handleChange('name')}
            touched={getIn(formik.touched, 'name')}
            disabled={isSubmitting}
            value={formik.values.name}
          />
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
