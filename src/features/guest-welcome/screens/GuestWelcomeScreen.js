import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { Layout } from '_components/ui/Layout'
import { Button } from '_components/ui/Button'
import ImageLogo from '_components/ImageLogo'

const GuestWelcomeScreen = ({ navigation }) => {
  const handlePressOnSignIn = () => {
    navigation.navigate('SignIn')
  }

  const handlePressOnSignUp = () => {
    navigation.navigate('SignUp')
  }

  return (
    <Layout>
      <ImageLogo style={styles.image} />
      <Button
        variant="block"
        style={styles.button}
        onPress={handlePressOnSignIn}
      >
        Sign In
      </Button>
      <Button
        colorScheme="light"
        variant="block"
        style={styles.button}
        onPress={handlePressOnSignUp}
      >
        Create Account
      </Button>
    </Layout>
  )
}

GuestWelcomeScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
}

export default GuestWelcomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  image: {
    marginBottom: 20,
  },
  button: {
    marginBottom: 18,
  },
})
