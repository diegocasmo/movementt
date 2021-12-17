import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { StyleSheet } from 'react-native'
import { View, Button } from 'native-base'
import { Icon } from '_components/Icon'
import { getUser } from '_state/reducers/auth'
import { RoutineExercise } from '_api'

const MeasurementTypesForm = ({ routineExercise, bag, disabled }) => {
  const user = useSelector(getUser)

  const isCategoryReps = RoutineExercise.isCategoryTypeReps(routineExercise)
  const isCategoryTime = RoutineExercise.isCategoryTypeTime(routineExercise)
  const isCategoryDistance =
    RoutineExercise.isCategoryTypeDistance(routineExercise)

  const handleChangeCategory = async (categoryType) => {
    if (disabled) return

    const attrs = await RoutineExercise.build({
      ...routineExercise,
      weight_unit_type: user.weight_unit_type,
      distance_unit_type: user.distance_unit_type,
      category_type: categoryType,
    })

    bag.setValues(attrs, false)
  }

  return (
    <View style={styles.container}>
      <Button
        first
        light
        rounded
        small
        style={[styles.btn, isCategoryReps ? styles.btnActive : {}]}
        active={isCategoryReps}
        disabled={disabled}
        onPress={() => {
          handleChangeCategory(RoutineExercise.CATEGORY_TYPE_REPS)
        }}
      >
        <Icon
          style={[styles.icon, isCategoryReps ? styles.iconActive : {}]}
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
          isCategoryTime ? styles.btnActive : {},
        ]}
        active={isCategoryTime}
        disabled={disabled}
        onPress={() => {
          handleChangeCategory(RoutineExercise.CATEGORY_TYPE_TIME)
        }}
      >
        <Icon
          style={[styles.icon, isCategoryTime ? styles.iconActive : {}]}
          name="md-time-outline"
          size={18}
        />
      </Button>
      <Button
        last
        light
        rounded
        small
        style={[styles.btn, isCategoryDistance ? styles.btnActive : {}]}
        active={isCategoryDistance}
        disabled={disabled}
        onPress={() => {
          handleChangeCategory(RoutineExercise.CATEGORY_TYPE_DISTANCE)
        }}
      >
        <Icon
          style={[styles.icon, isCategoryDistance ? styles.iconActive : {}]}
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
  disabled: PropTypes.bool,
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
