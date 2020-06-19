import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { Container, Content, Text } from 'native-base'
import EmailAndPasswordForm from '_components/EmailAndPasswordForm'
import { showError } from '_utils/toast'
import { createUserWithEmailAndPassword } from '_api/sign-up'
import { sendEmailVerification } from '_api/send-email-verification'
import { currentUser } from '_api/current-user'

const SignUpScreen = ({ navigation }) => {
  const [isSigningUp, setIsSigningUp] = useState(false)

  const handlePressOnSignIn = () => {
    navigation.navigate('SignIn')
  }

  const handleSubmit = async ({ email, password }) => {
    setIsSigningUp(true)
    try {
      await createUserWithEmailAndPassword(email, password)
      sendEmailVerification(currentUser())
    } catch (err) {
      setIsSigningUp(false)
      showError(err.message)
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
