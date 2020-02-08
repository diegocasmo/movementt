import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { Container, Button, Text } from 'native-base'
import ImageLogo from '../../../components/ImageLogo'

const GuestWelcomeScreen = ({ navigation }) => {
  const handlePressOnSignIn = () => {
    navigation.navigate('SignIn')
  }

  const handlePressOnSignUp = () => {
    navigation.navigate('SignUp')
  }

  return (
    <Container style={styles.container}>
      <ImageLogo style={styles.image} />
      <Button primary block style={styles.button} onPress={handlePressOnSignIn}>
        <Text>Sign In</Text>
      </Button>
      <Button light block style={styles.button} onPress={handlePressOnSignUp}>
        <Text>Create Account</Text>
      </Button>
    </Container>
  )
}

GuestWelcomeScreen.navigationOptions = {
  title: 'Welcome',
  headerShown: false,
  gestureEnabled: false,
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
