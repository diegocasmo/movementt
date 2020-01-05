import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet } from 'react-native'
import { Container, Content, Text } from 'native-base'
import { signUp, signUpReset } from '../../../state/reducers/auth'
import EmailAndPasswordForm from '../components/EmailAndPasswordForm'
import { showError } from '../../../utils/toast'

const SignUpScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const { isSigningUp } = useSelector(({ auth }) => ({
    isSigningUp: auth.isSigningUp,
  }))

  useEffect(() => {
    return () => {
      dispatch(signUpReset())
    }
  }, [dispatch])

  const handlePressOnSignIn = () => {
    navigation.navigate('SignIn')
  }

  const handleSubmit = async ({ email, password }) => {
    try {
      await dispatch(signUp(email, password))
    } catch (err) {
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
