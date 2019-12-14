import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet } from 'react-native'
import { Container, Text } from 'native-base'
import { signUp } from '../../../state/reducers/auth'
import EmailAndPasswordForm from '../components/EmailAndPasswordForm'

const SignUpScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const { isSigningUp } = useSelector(({ auth }) => ({
    isSigningUp: auth.isSigningUp,
  }))

  const handleClickOnSignIn = () => {
    navigation.navigate('SignIn')
  }

  return (
    <Container style={styles.container}>
      <EmailAndPasswordForm
        buttonText="Create Account"
        onSubmit={({ email, password }) => {
          dispatch(signUp(email, password))
        }}
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
