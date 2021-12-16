import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { View, H1, Button, Text, Spinner } from 'native-base'
import { Picker } from '@react-native-picker/picker'
import Modal from '_components/Modal'

export const UnitTypeForm = ({
  isSubmitting,
  onCancel,
  onSubmit,
  options,
  title,
  value,
  visible,
}) => {
  const [selectedValue, setSelectedValue] = useState(value)

  // Reset picker when action is canceled
  const handleCancel = () => {
    setSelectedValue(value)
    onCancel()
  }

  return (
    <Modal
      style={styles.container}
      childrenStyle={styles.childrenStyle}
      visible={visible}
      onRequestClose={handleCancel}
    >
      <View style={styles.top}>
        <H1 style={styles.h1}>{title}</H1>
      </View>

      <View style={styles.middle}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={(itemValue) => setSelectedValue(itemValue)}
        >
          {options.map((option) => (
            <Picker.Item
              key={option.value}
              label={option.label}
              value={option.value}
            />
          ))}
        </Picker>
      </View>

      <View style={styles.bottom}>
        <Button
          style={styles.btn}
          light
          onPress={handleCancel}
          disabled={isSubmitting}
        >
          <Text>Cancel</Text>
        </Button>

        <Button
          style={styles.btn}
          primary
          disabled={isSubmitting}
          onPress={onSubmit}
        >
          {isSubmitting ? (
            <Spinner color="white" size="small" />
          ) : (
            <Text>Save</Text>
          )}
        </Button>
      </View>
    </Modal>
  )
}

UnitTypeForm.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  value: PropTypes.string,
}

const styles = StyleSheet.create({
  container: {},
  top: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  middle: {},
  bottom: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  childrenStyle: {
    height: 340,
  },
  btn: {
    justifyContent: 'center',
    minWidth: 100,
    maxWidth: '40%',
  },
})
