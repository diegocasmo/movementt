import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { View, H1, Button, Text, Spinner, Grid, Col } from 'native-base'
import { useFormik, getIn } from 'formik'
import Modal from '_components/Modal'
import { TextInput, ModalPickerInput } from '_components/form'
import { Exercise } from '_api'

const ExerciseForm = ({
  exercise,
  onCancel,
  onSubmit,
  onSubmitFulfilled = () => {},
  onSubmitRejected = () => {},
  visible,
}) => {
  const formik = useFormik({
    initialValues: exercise,
    validationSchema: Exercise.SCHEMA,
    onSubmit: async (values) => {
      try {
        const data = await onSubmit(Exercise.SCHEMA.cast(values))

        onSubmitFulfilled(data)
      } catch (err) {
        onSubmitRejected(err)
      }
    },
  })

  const isValid = Object.keys(formik.errors).length === 0

  return (
    <Modal
      visible={visible}
      onRequestClose={onCancel}
      childrenStyle={styles.childrenStyle}
    >
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
            disabled={formik.isSubmitting}
            value={formik.values.name}
          />
        </Col>
      </Grid>

      <Grid>
        <Col flexGrow={1}>
          <ModalPickerInput
            label="Movement type"
            options={Exercise.MOVEMENT_TYPE_OPTS.map((opt, idx) => ({
              key: idx,
              ...opt,
            }))}
            onValueChange={formik.handleChange('movement_type')}
            value={formik.values.movement_type}
            disabled={formik.isSubmitting}
          />
        </Col>
      </Grid>

      <View style={styles.actions}>
        <Button
          light
          style={styles.btn}
          onPress={onCancel}
          disabled={formik.isSubmitting}
        >
          <Text>Cancel</Text>
        </Button>

        <Button
          primary
          style={styles.btn}
          disabled={!isValid || formik.isSubmitting}
          onPress={formik.handleSubmit}
        >
          {formik.isSubmitting ? (
            <Spinner color="white" size="small" />
          ) : (
            <Text>{exercise.created_at ? 'Update' : 'Create'}</Text>
          )}
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
  visible: PropTypes.bool.isRequired,
}

export default ExerciseForm

const styles = StyleSheet.create({
  h1: {
    marginRight: 'auto',
    marginLeft: 'auto',
    marginBottom: 20,
  },
  childrenStyle: {
    height: 320,
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
