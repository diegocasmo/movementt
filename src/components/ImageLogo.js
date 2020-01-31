import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Image } from 'react-native'

const ImageLogo = ({ style }) => {
  return (
    <Image
      style={[styles.image, style]}
      source={require('../../assets/logo.svg')}
    />
  )
}

ImageLogo.propTypes = {
  style: PropTypes.object,
}

export default ImageLogo

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
  },
})
