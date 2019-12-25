import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet } from 'react-native'
import { Container, Content, Toast, Text } from 'native-base'
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
})
