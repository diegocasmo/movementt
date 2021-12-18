import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Alert } from 'react-native'
import { Card, CardItem, Body, Text, Button } from 'native-base'
import { Icon } from '_components/Icon'
import { Formik } from 'formik'
import RepsRoutineExerciseForm from './exercise-categories/RepsRoutineExerciseForm'
import TimeRoutineExerciseForm from './exercise-categories/TimeRoutineExerciseForm'
import DistanceRoutineExerciseForm from './exercise-categories/DistanceRoutineExerciseForm'
import MeasurementTypesForm from '_components/routine-form/MeasurementTypesForm'
import { RoutineExercise } from '_api'

const RoutineExerciseForm = ({
  previewMode,
  disabled,
  onChange,
  onDelete,
  routineExercise,
}) => {
  const renderRoutineExerciseForm = (categoryType, bag) => {
    switch (categoryType) {
      case RoutineExercise.CATEGORY_TYPE_TIME:
        return <TimeRoutineExerciseForm disabled={disabled} bag={bag} />
      case RoutineExercise.CATEGORY_TYPE_DISTANCE:
        return <DistanceRoutineExerciseForm disabled={disabled} bag={bag} />
      default:
        return <RepsRoutineExerciseForm disabled={disabled} bag={bag} />
    }
  }

  const handleDelete = () => {
    Alert.alert(
      'Delete Exercise',
      `Are you sure you want to delete the "${routineExercise.name}" exercise?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            onDelete(routineExercise)
          },
        },
      ],
      { cancelable: false }
    )
  }

  if (RoutineExercise.willDestroy(routineExercise)) return null

  return (
    <Formik
      initialValues={routineExercise}
      validationSchema={RoutineExercise.SCHEMA}
    >
      {(bag) => {
        useEffect(() => {
          onChange(RoutineExercise.SCHEMA.cast(bag.values))
        }, [bag.values])

        return (
          <Card style={styles.card}>
            <CardItem style={styles.header} header>
              <Icon style={styles.dragIcon} name="md-reorder-three-outline" />
              <Text style={styles.name} numberOfLines={1}>
                {routineExercise.name}
              </Text>
              <Button transparent disabled={disabled} onPress={handleDelete}>
                {!previewMode && (
                  <Icon style={styles.deleteIcon} name="md-trash-outline" />
                )}
              </Button>
            </CardItem>
            <CardItem style={styles.bodyContainer}>
              {!previewMode && (
                <Body style={styles.body}>
                  {renderRoutineExerciseForm(
                    routineExercise.category_type,
                    bag
                  )}
                </Body>
              )}
            </CardItem>
            <CardItem style={styles.footer} footer>
              {!previewMode && (
                <MeasurementTypesForm
                  routineExercise={routineExercise}
                  disabled={disabled}
                  bag={bag}
                />
              )}
            </CardItem>
          </Card>
        )
      }}
    </Formik>
  )
}

RoutineExerciseForm.defaultProps = {
  previewMode: false,
}

RoutineExerciseForm.propTypes = {
  previewMode: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  routineExercise: PropTypes.object.isRequired,
}

export default RoutineExerciseForm

const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
  },
  header: {
    paddingTop: 0,
    paddingBottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  name: {
    flex: 1,
  },
  dragIcon: {
    color: 'black',
  },
  deleteIcon: {
    color: 'black',
  },
  bodyContainer: {
    paddingTop: 0,
  },
  body: {
    paddingBottom: 5,
  },
  footer: {
    paddingTop: 0,
  },
})
