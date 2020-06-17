import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { View, Col, Grid } from 'native-base'
import { TextInput, DecimalInput } from '../../form'
import { getIn } from 'formik'
import Exercise from '../../../api/models/Exercise'
import TimePicker from '../pickers/TimePicker'
import DistancePicker from '../pickers/DistancePicker'

const DistanceForm = ({
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
          <DistancePicker
            label="Distance"
            allowNone={false}
            value={`${values.quantity}`}
            onChange={handleChange('quantity')}
          />
        </Col>
      </Grid>

      <Grid>
        <Col flexGrow={1} paddingRight={10}>
          <DecimalInput
            label={`Weight (${Exercise.WEIGHT_KG_UNIT})`}
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

DistanceForm.propTypes = {
  errors: PropTypes.object,
  handleBlur: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  touched: PropTypes.object,
  values: PropTypes.object,
}

export default DistanceForm

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
