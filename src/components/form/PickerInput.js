import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { Item, Picker, Label } from 'native-base'

const PickerInput = ({
  enabled = true,
  label,
  onValueChange,
  options,
  style,
  value,
}) => {
  return (
    <Item stackedLabel style={[styles.container, style]}>
      <Label style={styles.label}>{label}</Label>
      <Picker
        enabled={enabled}
        iosHeader={label}
        style={styles.picker}
        textStyle={styles.textStyle}
        selectedValue={`${value}`}
        onValueChange={onValueChange}
      >
        {options.map(({ label, value }, idx) => (
          <Picker.Item key={idx} label={label} value={`${value}`} />
        ))}
      </Picker>
    </Item>
  )
}

PickerInput.propTypes = {
  enabled: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        .isRequired,
    })
  ).isRequired,
  style: PropTypes.object,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  label: {
    fontSize: 16,
    color: '#575757',
  },
  picker: {
    paddingTop: 0,
    paddingBottom: 16,
    marginBottom: -5,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  textStyle: {
    minWidth: '100%',
    width: '100%',
    color: 'black',
    paddingTop: 5,
    paddingLeft: 5,
    paddingRight: 5,
  },
})

export default PickerInput
