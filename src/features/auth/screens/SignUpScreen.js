import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet } from 'react-native'
import { Container, Toast, Text } from 'native-base'
import { signUp, signUpReset } from '../../../state/reducers/auth'
import EmailAndPasswordForm from '../components/EmailAndPasswordForm'

const SignUpScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const { isSigningUp, signingUpError } = useSelector(({ auth }) => ({
    isSigningUp: auth.isSigningUp,
    signingUpError: auth.signingUpError,
  }))

  useEffect(() => {
    if (signingUpError) {
      Toast.show({ text: signingUpError, type: 'danger', duration: 5000 })
    }
  }, [signingUpError])

  useEffect(() => {
    return () => {
      dispatch(signUpReset())
    }
  }, [dispatch])

  const handlePressOnSignIn = () => {
    navigation.navigate('SignIn')
  }

  const handleSubmit = ({ email, password }) => {
    dispatch(signUp(email, password))
  }

  return (
    <Container style={styles.container}>
      <EmailAndPasswordForm
        style={styles.form}
        buttonText="Create Account"
        onSubmit={handleSubmit}
        isSubmitting={isSigningUp}
      />
      <Text style={styles.captionText} onPress={handlePressOnSignIn}>
        Not the first time here? <Text style={styles.signInText}>Sign in</Text>
      </Text>
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
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    paddingLeft: 20,
    paddingRight: 20,
    width: '100%',
    alignItems: 'center',
  },
  captionText: {
    marginTop: 40,
  },
  signInText: {
    textDecorationLine: 'underline',
  },
})
