import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { View, Grid, Col } from 'native-base'
import { getIn } from 'formik'
import { IntegerInput, DecimalInput } from '_components/form'
import TimePicker from '_components/routine-form/pickers/TimePicker'
import { WEIGHT_KG_UNIT } from '_api/routine-exercise'

const RepsRoutineExerciseForm = ({ bag }) => {
  const { errors, handleBlur, handleChange, touched, values } = bag

  return (
    <View style={styles.container}>
      <Grid>
        <Col flexGrow={1} paddingRight={10}>
          <IntegerInput
            label="Reps"
            error={getIn(errors, 'quantity')}
            onBlur={handleBlur('quantity')}
            onChange={handleChange('quantity')}
            touched={getIn(touched, 'quantity')}
            value={values.quantity}
          />
        </Col>
        <Col flexGrow={1} paddingRight={10}>
          <DecimalInput
            label={`Weight (${WEIGHT_KG_UNIT})`}
            error={getIn(errors, 'weight')}
            onBlur={handleBlur('weight')}
            onChange={handleChange('weight')}
            touched={getIn(touched, 'weight')}
            value={values.weight}
          />
        </Col>
      </Grid>
      <Grid>
        <Col flexGrow={1}>
          <TimePicker
            label="Rest"
            value={`${values.rest_seconds}`}
            onChange={handleChange('rest_seconds')}
          />
        </Col>
      </Grid>
    </View>
  )
}

RepsRoutineExerciseForm.propTypes = {
  bag: PropTypes.object.isRequired,
}

export default RepsRoutineExerciseForm

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
})
