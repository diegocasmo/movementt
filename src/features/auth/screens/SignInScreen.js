import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet } from 'react-native'
import { Container, Text } from 'native-base'
import { signIn } from '../../../state/reducers/auth'
import EmailAndPasswordForm from '../components/EmailAndPasswordForm'

const SignInScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const { isSigningIn } = useSelector(({ auth }) => ({
    isSigningIn: auth.isSigningIn,
  }))

  const handleClickOnSignUp = () => {
    navigation.navigate('SignUp')
  }

  return (
    <Container style={styles.container}>
      <EmailAndPasswordForm
        buttonText="Sign In"
        onSubmit={({ email, password }) => {
          dispatch(signIn(email, password))
        }}
        isSubmitting={isSigningIn}
      />
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
  submitError: {
    textAlign: 'center',
    marginTop: 30,
  },
})
