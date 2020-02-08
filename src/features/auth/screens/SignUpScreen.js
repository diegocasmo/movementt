import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { Container, Content, Text } from 'native-base'
import EmailAndPasswordForm from '../../../components/EmailAndPasswordForm'
import { showError } from '../../../utils/toast'
import { createUserWithEmailAndPassword } from '../../../api/auth/sign-up'
import { sendEmailVerification } from '../../../api/user/send-email-verification'
import { currentUser } from '../../../api/user/current-user'

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
      <Content padder>
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

SignUpScreen.navigationOptions = {
  title: 'Create Account',
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
    marginTop: 40,
    textAlign: 'center',
  },
  signInText: {
    textDecorationLine: 'underline',
  },
})
