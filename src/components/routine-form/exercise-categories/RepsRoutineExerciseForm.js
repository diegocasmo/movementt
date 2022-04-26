import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { StyleSheet } from 'react-native'
import { View, Grid, Col } from 'native-base'
import { getIn } from 'formik'
import { IntegerField, DecimalInput } from '_components/form'
import TimePicker from '_components/routine-form/pickers/TimePicker'
import { getUser } from '_state/reducers/auth'
import { getWeightUnitTypeLabel } from '_utils/units'

const RepsRoutineExerciseForm = ({ bag, disabled }) => {
  const user = useSelector(getUser)
  const { errors, handleBlur, handleChange, touched, values } = bag

  return (
    <View style={styles.container}>
      <Grid>
        <Col flexGrow={1} paddingRight={10}>
          <IntegerField label="Reps" name="quantity" />
        </Col>
        <Col flexGrow={1} paddingRight={10}>
          <DecimalInput
            label={`Weight (${getWeightUnitTypeLabel(user.weight_unit_type)})`}
            value={values.weight}
            disabled={disabled}
            error={getIn(errors, 'weight')}
            onBlur={handleBlur('weight')}
            onChange={handleChange('weight')}
            touched={getIn(touched, 'weight')}
          />
        </Col>
        <Col flexGrow={1}>
          <TimePicker
            label="Rest"
            value={`${values.rest_ms}`}
            disabled={disabled}
            onChange={handleChange('rest_ms')}
          />
        </Col>
      </Grid>
    </View>
  )
}

RepsRoutineExerciseForm.propTypes = {
  bag: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
}

export default RepsRoutineExerciseForm

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
})
