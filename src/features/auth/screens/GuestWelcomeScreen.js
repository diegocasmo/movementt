import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Image } from 'react-native'
import { Container, Button, Text } from 'native-base'
import ImageLogo from '../../../components/ImageLogo'

const GuestWelcomeScreen = ({ navigation }) => {
  const handleClickOnSignIn = () => {
    navigation.navigate('SignIn')
  }

  const handleClickOnSignUp = () => {
    navigation.navigate('SignUp')
  }

  return (
    <Container style={styles.container}>
      <ImageLogo style={styles.image} />
      <Button primary block style={styles.button} onPress={handleClickOnSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </Button>
      <Button light block style={styles.button} onPress={handleClickOnSignUp}>
        <Text style={styles.buttonText}>Create Account</Text>
      </Button>
    </Container>
  )
}

GuestWelcomeScreen.navigationOptions = {
  header: null,
  gesturesEnabled: false,
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
    paddingLeft: 20,
    paddingRight: 20,
  },
  image: {
    marginBottom: 20,
  },
  button: {
    marginBottom: 18,
    height: 70,
  },
  buttonText: {
    fontSize: 27,
  },
})
