import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { Container, Content, Text } from 'native-base'
import EmailAndPasswordForm from '_components/EmailAndPasswordForm'
import { useAuth } from '_context/AuthContext'
import { showError } from '_utils/toast'

const SignUpScreen = ({ navigation }) => {
  const { signUp } = useAuth()

  const handlePressOnSignIn = () => {
    navigation.navigate('SignIn')
  }

  const handleSubmit = async (attrs) => {
    try {
      await signUp.mutateAsync({ bodyParams: attrs })
    } catch (err) {
      showError(err)
    }
  }

  return (
    <Container>
      <Content padder showsVerticalScrollIndicator={false}>
        <EmailAndPasswordForm
          style={styles.form}
          buttonText="Create Account"
          onSubmit={handleSubmit}
          isSubmitting={signUp.isLoading}
          withPasswordConfirmation={true}
        />
        <Text style={styles.captionText} onPress={handlePressOnSignIn}>
          Not the first time here?&nbsp;
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
