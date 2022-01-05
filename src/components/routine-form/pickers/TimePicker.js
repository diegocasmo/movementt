import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import ModalSelector from 'react-native-modal-selector'
import { TextInput } from '_components/form'
import { TIME_OPTS } from '_utils/time-utils'

const TimePicker = ({ label, onChange, value, allowNone = true, ...props }) => {
  const [visible] = useState(false)

  const handleChange = (option) => {
    onChange(`${option.valueInMs}`)
  }

  const noop = () => {}

  const findTimeOpt = (value) => {
    const valueAsInt = parseInt(value, 10)
    return value === 0 || value === '0' || value
      ? TIME_OPTS.find((opt) => opt.valueInMs === valueAsInt)
      : null
  }

  const selectedOpt = findTimeOpt(value)

  // Remove 'None' from available options if it's value isn't allowed
  let options = TIME_OPTS
  if (!allowNone) {
    options = options.filter(({ valueInMs }) => valueInMs !== 0)
  }

  return (
    <ModalSelector
      data={options.map((opt, idx) => ({ key: idx, ...opt }))}
      visible={visible}
      supportedOrientations={['portrait']}
      cancelText="Cancel"
      animationType="fade"
      onChange={handleChange}
      overlayStyle={styles.overlayStyle}
      optionContainerStyle={styles.optionContainerStyle}
      cancelStyle={styles.cancelStyle}
      optionTextStyle={styles.optionTextStyle}
      {...props}
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
  allowNone: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
}

const styles = StyleSheet.create({
  overlayStyle: {
    flex: 1,
    paddingTop: 120,
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
