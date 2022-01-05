import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { View, Grid, Col } from 'native-base'
import { getIn } from 'formik'
import { DecimalInput } from '_components/form'
import TimePicker from '_components/routine-form/pickers/TimePicker'
import { getDistanceUnitTypeLabel, getWeightUnitTypeLabel } from '_utils/units'

const DistanceRoutineExerciseForm = ({ bag, disabled }) => {
  const { errors, handleBlur, handleChange, touched, values } = bag

  return (
    <View style={styles.container}>
      <Grid>
        <Col flexGrow={1} paddingRight={10}>
          <DecimalInput
            label={`Distance (${getDistanceUnitTypeLabel(
              values.distance_unit_type
            )})`}
            value={values.quantity}
            disabled={disabled}
            error={getIn(errors, 'quantity')}
            onBlur={handleBlur('quantity')}
            onChange={handleChange('quantity')}
            touched={getIn(touched, 'quantity')}
          />
        </Col>

        <Col flexGrow={1} paddingRight={10}>
          <DecimalInput
            label={`Weight (${getWeightUnitTypeLabel(
              values.weight_unit_type
            )})`}
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

DistanceRoutineExerciseForm.propTypes = {
  bag: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
}

export default DistanceRoutineExerciseForm

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
})
