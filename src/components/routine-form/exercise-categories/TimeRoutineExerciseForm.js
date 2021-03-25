import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { View, Grid, Col } from 'native-base'
import { getIn } from 'formik'
import { DecimalInput } from '_components/form'
import TimePicker from '_components/routine-form/pickers/TimePicker'
import { RoutineExercise } from '_api'

const TimeRoutineExerciseForm = ({ bag, disabled }) => {
  const { errors, handleBlur, handleChange, touched, values } = bag

  return (
    <View style={styles.container}>
      <Grid>
        <Col flexGrow={1} paddingRight={10}>
          <TimePicker
            label="Time"
            allowNone={false}
            disabled={disabled}
            value={`${values.quantity}`}
            onChange={handleChange('quantity')}
          />
        </Col>
        <Col flexGrow={1} paddingRight={10}>
          <DecimalInput
            label={`Weight (${RoutineExercise.getWeightUnitTypeLabel(values)})`}
            value={values.weight}
            disabled={disabled}
            error={getIn(errors, 'weight')}
            onBlur={handleBlur('weight')}
            onChange={handleChange('weight')}
            touched={getIn(touched, 'weight')}
          />
        </Col>
      </Grid>
      <Grid>
        <Col flexGrow={1}>
          <TimePicker
            label="Rest"
            value={`${values.rest_seconds}`}
            disabled={disabled}
            onChange={handleChange('rest_seconds')}
          />
        </Col>
      </Grid>
    </View>
  )
}

TimeRoutineExerciseForm.propTypes = {
  bag: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
}

export default TimeRoutineExerciseForm

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
})
