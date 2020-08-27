import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { StyleSheet } from 'react-native'
import { View, H1, Button, Text, Spinner, Grid, Col } from 'native-base'
import { Formik, getIn } from 'formik'
import Modal from '_components/Modal'
import { TextInput, ModalPickerInput } from '_components/form'
import { isCreating, isUpdating } from '_state/reducers/exercises'
import { EXERCISE_SCHEMA, CATEGORY_OPTS } from '_api/exercise'

const ExerciseForm = ({ exercise, onCancel, onSubmit, visible }) => {
  const creating = useSelector(isCreating)
  const updating = useSelector((state) => isUpdating(state, exercise.key))
  const submitting = creating || updating

  return (
    <Formik
      initialValues={exercise}
      validationSchema={EXERCISE_SCHEMA}
      onSubmit={(attrs, opts) => {
        onSubmit(EXERCISE_SCHEMA.cast(attrs), opts)
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        touched,
        values,
      }) => {
        const isValid = Object.keys(errors).length === 0

        return (
          <Modal visible={visible} onRequestClose={onCancel}>
            <H1 style={styles.h1}>
              {exercise.createdAt ? 'Update' : 'Create'} Exercise
            </H1>

            <Grid>
              <Col flexGrow={1}>
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
              <Col flexGrow={1}>
                <ModalPickerInput
                  label="Category"
                  options={CATEGORY_OPTS.map((opt, idx) => ({
                    key: idx,
                    ...opt,
                  }))}
                  onValueChange={handleChange('category')}
                  value={values.category}
                />
              </Col>
            </Grid>

            <View style={styles.actions}>
              <Button light style={styles.btn} onPress={onCancel}>
                <Text>Cancel</Text>
              </Button>

              <Button
                primary
                style={styles.btn}
                disabled={!isValid || submitting}
                onPress={handleSubmit}
              >
                {submitting ? (
                  <Spinner color="white" size="small" />
                ) : (
                  <Text>{exercise.createdAt ? 'Update' : 'Create'}</Text>
                )}
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
