import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { View, H1, Button, Text, Spinner } from 'native-base'
import Modal from '_components/Modal'

export const SystemOfMeasurementModal = ({
  isSubmitting,
  onCancel,
  onSubmit,
  title,
  visible,
}) => (
  <Modal
    visible={visible}
    onRequestClose={onCancel}
    style={styles.childrenStyle}
  >
    <H1 style={styles.h1}>{title}</H1>
    <View style={styles.actions}>
      <Button
        light
        style={styles.btn}
        onPress={onCancel}
        disabled={isSubmitting}
      >
        <Text>Cancel</Text>
      </Button>

      <Button
        primary
        style={styles.btn}
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

SystemOfMeasurementModal.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
}

const styles = StyleSheet.create({
  h1: {
    marginRight: 'auto',
    marginLeft: 'auto',
    marginBottom: 20,
  },
  childrenStyle: {
    height: 320,
  },
  actions: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btn: {
    width: '40%',
    justifyContent: 'center',
  },
})
