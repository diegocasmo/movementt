import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet } from 'react-native'
import { Container, Content, Text } from 'native-base'
import { signIn, signInReset } from '../../../state/reducers/auth'
import EmailAndPasswordForm from '../components/EmailAndPasswordForm'
import { showError } from '../../../utils/toast'

const SignInScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const { isSigningIn } = useSelector(({ auth }) => ({
    isSigningIn: auth.isSigningIn,
  }))

  useEffect(() => {
    return () => {
      dispatch(signInReset())
    }
  }, [dispatch])

  const handlePressOnSignUp = () => {
    navigation.navigate('SignUp')
  }

  const handleSubmit = async ({ email, password }) => {
    try {
      await dispatch(signIn(email, password))
    } catch (err) {
      showError(err.message)
    }
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
