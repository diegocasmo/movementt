import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { View, Button } from 'native-base'
import { Icon } from '_components/Icon'
import {
  buildRoutineExercise,
  isExerciseCategoryTime,
  isExerciseCategoryReps,
  isExerciseCategoryDistance,
  CATEGORY_REPS,
  CATEGORY_TIME,
  CATEGORY_DISTANCE,
} from '_api/routine-exercise'

const MeasurementTypesForm = ({ routineExercise, bag }) => {
  const handleChangeCategory = async (category) => {
    const attrs = await buildRoutineExercise({ ...routineExercise, category })

    bag.setValues(attrs, false)
  }

  return (
    <View style={styles.container}>
      <Button
        first
        light
        rounded
        small
        style={[
          styles.btn,
          isExerciseCategoryReps(routineExercise) ? styles.btnActive : {},
        ]}
        active={isExerciseCategoryReps(routineExercise)}
        onPress={() => {
          handleChangeCategory(CATEGORY_REPS)
        }}
      >
        <Icon
          style={[
            styles.icon,
            isExerciseCategoryReps(routineExercise) ? styles.iconActive : {},
          ]}
          name="md-repeat-sharp"
          size={18}
        />
      </Button>
      <Button
        light
        rounded
        small
        style={[
          styles.btn,
          styles.middle,
          isExerciseCategoryTime(routineExercise) ? styles.btnActive : {},
        ]}
        active={isExerciseCategoryTime(routineExercise)}
        onPress={() => {
          handleChangeCategory(CATEGORY_TIME)
        }}
      >
        <Icon
          style={[
            styles.icon,
            isExerciseCategoryTime(routineExercise) ? styles.iconActive : {},
          ]}
          name="md-time-outline"
          size={18}
        />
      </Button>
      <Button
        last
        light
        rounded
        small
        style={[
          styles.btn,
          isExerciseCategoryDistance(routineExercise) ? styles.btnActive : {},
        ]}
        active={isExerciseCategoryDistance(routineExercise)}
        onPress={() => {
          handleChangeCategory(CATEGORY_DISTANCE)
        }}
      >
        <Icon
          style={[
            styles.icon,
            isExerciseCategoryDistance(routineExercise)
              ? styles.iconActive
              : {},
          ]}
          name="md-location"
          size={18}
        />
      </Button>
    </View>
  )
}

MeasurementTypesForm.propTypes = {
  routineExercise: PropTypes.object.isRequired,
  bag: PropTypes.object.isRequired,
}

export default MeasurementTypesForm

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnActive: {
    backgroundColor: 'black',
  },
  icon: {},
  iconActive: {
    color: 'white',
  },
  middle: {
    marginLeft: 15,
    marginRight: 15,
  },
})
