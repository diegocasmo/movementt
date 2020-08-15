import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { View, Col, Grid } from 'native-base'
import { TextInput, DecimalInput } from '_components/form'
import { getIn } from 'formik'
import { WEIGHT_KG_UNIT } from '_api/routine-exercise'
import TimePicker from '_components/routine-form/pickers/TimePicker'

const TimeExerciseForm = ({
  errors,
  handleBlur,
  handleChange,
  touched,
  values,
}) => {
  return (
    <View style={styles.container}>
      <Grid>
        <Col flexGrow={1.5} paddingRight={10}>
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
        <Col flexGrow={0.8}>
          <TimePicker
            label="Time"
            allowNone={false}
            value={`${values.quantity}`}
            onChange={handleChange('quantity')}
          />
        </Col>
      </Grid>

      <Grid>
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

TimeExerciseForm.propTypes = {
  errors: PropTypes.object,
  handleBlur: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  touched: PropTypes.object,
  values: PropTypes.object,
}

export default TimeExerciseForm

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
