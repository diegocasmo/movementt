import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { Button, Text } from 'native-base'
import { Layout } from '_components/ui/Layout'
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
      <Button primary block style={styles.button} onPress={handlePressOnSignIn}>
        <Text>Sign In</Text>
      </Button>
      <Button light block style={styles.button} onPress={handlePressOnSignUp}>
        <Text>Create Account</Text>
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
