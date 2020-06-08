import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import ModalSelector from 'react-native-modal-selector'
import TextInput from './TextInput'

const ModalPickerInput = ({ options, label, onValueChange, value }) => {
  const [visible] = useState(false)

  const noop = () => {}

  const handleChange = (option) => {
    onValueChange(`${option.value}`)
  }

  return (
    <ModalSelector
      data={options}
      visible={visible}
      supportedOrientations={['portrait']}
      animationType="fade"
      cancelText="Cancel"
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
        value={value ? options.find((opt) => opt.value === value).label : null}
      />
    </ModalSelector>
  )
}

export default ModalPickerInput

ModalPickerInput.propTypes = {
  options: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
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
