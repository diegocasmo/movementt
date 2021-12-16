import React from 'react'
import PropTypes from 'prop-types'
import { Modal as RNModal, StyleSheet } from 'react-native'
import { View } from 'native-base'

const Modal = ({
  children,
  childrenStyle,
  containerStyle,
  onRequestClose,
  visible,
}) => {
  return (
    <RNModal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}
    >
      <View style={[styles.container, containerStyle]}>
        <View style={[styles.children, childrenStyle]}>{children}</View>
      </View>
    </RNModal>
  )
}

export default Modal

Modal.propTypes = {
  children: PropTypes.node,
  containerStyle: PropTypes.object,
  childrenStyle: PropTypes.object,
  onRequestClose: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 100,
    marginLeft: 25,
    marginRight: 25,
  },
  children: {
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
    height: 320,
    width: '100%',
  },
})
