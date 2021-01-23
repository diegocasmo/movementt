import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Alert } from 'react-native'
import { Card, CardItem, Body, H3, Button } from 'native-base'
import { Icon } from '_components/Icon'
import { Formik } from 'formik'
import RepsRoutineExerciseForm from './exercise-categories/RepsRoutineExerciseForm'
import TimeRoutineExerciseForm from './exercise-categories/TimeRoutineExerciseForm'
import DistanceRoutineExerciseForm from './exercise-categories/DistanceRoutineExerciseForm'
import MeasurementTypesForm from '_components/routine-form/MeasurementTypesForm'
import {
  CATEGORY_TIME,
  CATEGORY_DISTANCE,
  ROUTINE_EXERCISE_SCHEMA,
} from '_api/routine-exercise'

const RoutineExerciseForm = ({ routineExercise, onChange, onDelete }) => {
  const renderRoutineExerciseForm = (category, bag) => {
    switch (category) {
      case CATEGORY_TIME:
        return <TimeRoutineExerciseForm bag={bag} />
      case CATEGORY_DISTANCE:
        return <DistanceRoutineExerciseForm bag={bag} />
      default:
        return <RepsRoutineExerciseForm bag={bag} />
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

  return (
    <Formik
      initialValues={routineExercise}
      validationSchema={ROUTINE_EXERCISE_SCHEMA}
    >
      {(bag) => {
        useEffect(() => {
          onChange(ROUTINE_EXERCISE_SCHEMA.cast(bag.values))
        }, [bag.values])

        return (
          <Card style={styles.card}>
            <CardItem style={styles.header} header>
              <H3 style={styles.name} numberOfLines={1}>
                {routineExercise.name}
              </H3>
              <Button transparent onPress={handleDelete}>
                <Icon style={styles.deleteIcon} name="md-trash-outline" />
              </Button>
            </CardItem>
            <CardItem style={styles.bodyContainer}>
              <Body style={styles.body}>
                {renderRoutineExerciseForm(routineExercise.category, bag)}
              </Body>
            </CardItem>
            <CardItem style={styles.footer} footer>
              <MeasurementTypesForm
                routineExercise={routineExercise}
                bag={bag}
              />
            </CardItem>
          </Card>
        )
      }}
    </Formik>
  )
}

RoutineExerciseForm.propTypes = {
  routineExercise: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
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
    fontWeight: 'normal',
    flex: 1,
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
