import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { Container, Content, Text } from 'native-base'
import EmailAndPasswordForm from '_components/EmailAndPasswordForm'
import { showError } from '_utils/toast'
import { User } from '_api'

const SignUpScreen = ({ navigation }) => {
  const [isSigningUp, setIsSigningUp] = useState(false)

  const handlePressOnSignIn = () => {
    navigation.navigate('SignIn')
  }

  const handleSubmit = async ({ email, password }) => {
    setIsSigningUp(true)
    try {
      await User.createUserWithEmailAndPassword(email, password)
      User.sendEmailVerification()
    } catch (err) {
      showError(err.message)
    } finally {
      setIsSigningUp(false)
    }
  }

  return (
    <Container>
      <Content padder showsVerticalScrollIndicator={false}>
        <EmailAndPasswordForm
          style={styles.form}
          buttonText="Create Account"
          onSubmit={handleSubmit}
          isSubmitting={isSigningUp}
          withPasswordConfirmation={true}
        />
        <Text style={styles.captionText} onPress={handlePressOnSignIn}>
          Not the first time here?{' '}
          <Text style={styles.signInText}>Sign in</Text>
        </Text>
      </Content>
    </Container>
  )
}

SignUpScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
}

export default SignUpScreen

const styles = StyleSheet.create({
  form: {
    width: '100%',
    alignItems: 'center',
  },
  captionText: {
    marginTop: 30,
    textAlign: 'center',
  },
  signInText: {
    textDecorationLine: 'underline',
  },
})
