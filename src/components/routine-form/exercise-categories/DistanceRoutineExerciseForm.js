import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { View, Grid, Col } from 'native-base'
import { getIn } from 'formik'
import { DecimalInput } from '_components/form'
import TimePicker from '_components/routine-form/pickers/TimePicker'
import DistancePicker from '_components/routine-form/pickers/DistancePicker'
import { WEIGHT_KG_UNIT } from '_api/routine-exercise'

const DistanceRoutineExerciseForm = ({ bag }) => {
  const { errors, handleBlur, handleChange, touched, values } = bag

  return (
    <View style={styles.container}>
      <Grid>
        <Col flexGrow={1} paddingRight={10}>
          <DistancePicker
            label="Distance"
            allowNone={false}
            value={`${values.quantity}`}
            onChange={handleChange('quantity')}
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
            value={`${values.restSeconds}`}
            onChange={handleChange('restSeconds')}
          />
        </Col>
      </Grid>
    </View>
  )
}

DistanceRoutineExerciseForm.propTypes = {
  bag: PropTypes.object.isRequired,
}

export default DistanceRoutineExerciseForm

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
})
