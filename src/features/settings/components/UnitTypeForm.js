import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { View, H1, Button, Text, Spinner } from 'native-base'
import Modal from '_components/Modal'

export const UnitTypeForm = ({
  isSubmitting,
  onCancel,
  onSubmit,
  title,
  visible,
}) => (
  <Modal visible={visible} onRequestClose={onCancel}>
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

UnitTypeForm.propTypes = {
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
