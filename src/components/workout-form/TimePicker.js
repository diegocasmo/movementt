import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import ModalSelector from 'react-native-modal-selector'
import { TextInput } from '../form'
import { TIME_OPTS } from '../../utils/time-utils'

const TimePicker = ({ label, onChange, value }) => {
  const [visible] = useState(false)

  const handleChange = (option) => {
    onChange(`${option.valueInSeconds}`)
  }

  const noop = () => {}

  const findTimeOpt = (value) => {
    const valueAsInt = parseInt(value, 10)
    return value === 0 || value === '0' || value
      ? TIME_OPTS.find((opt) => opt.valueInSeconds === valueAsInt)
      : null
  }

  const selectedOpt = findTimeOpt(value)

  return (
    <ModalSelector
      data={TIME_OPTS.map((opt, idx) => ({ key: idx, ...opt }))}
      visible={visible}
      supportedOrientations={['portrait']}
      cancelText="Cancel"
      animationType="fade"
      onChange={handleChange}
      overlayStyle={styles.overlayStyle}
      optionContainerStyle={styles.optionContainerStyle}
      cancelStyle={styles.cancelStyle}
      optionTextStyle={styles.optionTextStyle}
    >
      <TextInput
        label={label}
        onBlur={noop}
        onChange={noop}
        value={selectedOpt ? selectedOpt.label : null}
      />
    </ModalSelector>
  )
}

export default TimePicker

TimePicker.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
}

const styles = StyleSheet.create({
  overlayStyle: {
    flex: 1,
    paddingTop: 150,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  optionContainerStyle: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 250,
    height: 300,
  },
  cancelStyle: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 250,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  optionTextStyle: {
    color: 'black',
  },
})
