import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Modal, StyleSheet } from 'react-native'
import { View, H1, Button, Text, Spinner, Grid, Col } from 'native-base'
import { Formik, getIn } from 'formik'
import { TextInput, ModalPickerInput } from '_components/form'
import { isCreating, isUpdating } from '_state/reducers/exercises'
import Exercise from '_api/models/Exercise'

const ExerciseForm = ({ exercise, onCancel, onSubmit, visible }) => {
  const creating = useSelector(isCreating)
  const updating = useSelector((state) => isUpdating(state, exercise.key))
  const submitting = creating || updating

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
      }) => {
        const isValid = Object.keys(errors).length === 0

        return (
          <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onCancel}
          >
            <View style={styles.container}>
              <View style={styles.modalView}>
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
                      options={Exercise.CATEGORY_OPTS.map((opt, idx) => ({
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
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
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
    height: 320,
    width: '100%',
  },
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
