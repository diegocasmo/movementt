import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet } from 'react-native'
import { Container, Toast, Text } from 'native-base'
import { signIn, signInReset } from '../../../state/reducers/auth'
import EmailAndPasswordForm from '../components/EmailAndPasswordForm'

const SignInScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const { isSigningIn, signingInError } = useSelector(({ auth }) => ({
    isSigningIn: auth.isSigningIn,
    signingInError: auth.signingInError,
  }))

  useEffect(() => {
    if (signingInError) {
      Toast.show({ text: signingInError, type: 'danger', duration: 5000 })
    }
  }, [signingInError])

  useEffect(() => {
    return () => {
      dispatch(signInReset())
    }
  }, [dispatch])

  const handlePressOnSignUp = () => {
    navigation.navigate('SignUp')
  }

  const handleSubmit = ({ email, password }) => {
    dispatch(signIn(email, password))
  }

  return (
    <Container style={styles.container}>
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
  signUpText: {
    textDecorationLine: 'underline',
  },
})
