import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { Container, Content, Text } from 'native-base'
import EmailAndPasswordForm from '../components/EmailAndPasswordForm'
import { showError } from '../../../utils/toast'
import { signInWithEmailAndPassword } from '../../../api/auth/sign-in'

const SignInScreen = ({ navigation }) => {
  const [isSigningIn, setIsSigningIn] = useState(false)

  const handlePressOnSignUp = () => {
    navigation.navigate('SignUp')
  }

  const handleSubmit = async ({ email, password }) => {
    setIsSigningIn(true)
    try {
      await signInWithEmailAndPassword(email, password)
    } catch (err) {
      setIsSigningIn(false)
      showError(err.message)
    }
  }

  const handlePressOnForgotPassword = () => {
    navigation.navigate('ForgotPassword')
  }

  return (
    <Container>
      <Content padder>
        <EmailAndPasswordForm
          style={styles.form}
          buttonText="Sign In"
          onSubmit={handleSubmit}
          isSubmitting={isSigningIn}
        />
        <Text style={styles.captionText} onPress={handlePressOnSignUp}>
          First time here?{' '}
          <Text style={styles.signUpText}>Create an account</Text>
        </Text>
        <Text
          style={styles.forgotPasswordText}
          onPress={handlePressOnForgotPassword}
        >
          Forgot password
        </Text>
      </Content>
    </Container>
  )
}

SignInScreen.navigationOptions = {
  title: 'Sign In',
}

SignInScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
}

export default SignInScreen

const styles = StyleSheet.create({
  form: {
    width: '100%',
    alignItems: 'center',
  },
  captionText: {
    marginTop: 40,
    textAlign: 'center',
  },
  signUpText: {
    textDecorationLine: 'underline',
  },
  forgotPasswordText: {
    marginTop: 40,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
})
