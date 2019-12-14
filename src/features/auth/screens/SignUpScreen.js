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

  const handleClickOnSignIn = () => {
    navigation.navigate('SignIn')
  }

  const handleSubmit = ({ email, password }) => {
    dispatch(signUp(email, password))
  }

  return (
    <Container style={styles.container}>
      <EmailAndPasswordForm
        buttonText="Create Account"
        onSubmit={handleSubmit}
        isSubmitting={isSigningUp}
      />
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
  submitError: {
    textAlign: 'center',
    marginTop: 30,
  },
})
