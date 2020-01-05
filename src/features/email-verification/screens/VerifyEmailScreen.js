import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet, Image } from 'react-native'
import { Container, H1, Button, Text, Spinner } from 'native-base'
import {
  sendVerification,
  reloadCurrentUser,
} from '../../../state/reducers/auth'
import { currentUser } from '../../../api/user/current-user'
import { showSuccess, showWarning, showError } from '../../../utils/toast'
import ImageLogo from '../../../components/ImageLogo'

const VerifyEmailScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const { isSendingVerification, isReloadingCurrentUser } = useSelector(
    ({ auth }) => ({
      isSendingVerification: auth.isSendingVerification,
      isReloadingCurrentUser: auth.isReloadingCurrentUser,
    })
  )

  const handlePressOnDone = async () => {
    try {
      const user = await dispatch(reloadCurrentUser())

      if (user.emailVerified) {
        showSuccess('Email address successfully verified')
      } else {
        showWarning('Please, verify your email address')
      }
    } catch (err) {
      showError(err.message)
    }
  }

  const handlePressOnResendEmail = async () => {
    try {
      await dispatch(sendVerification(currentUser()))
      showSuccess('Verification email sent successfully')
    } catch (err) {
      showError(err.message)
    }
  }

  return (
    <Container style={styles.container}>
      <ImageLogo style={styles.image} />
      <H1 style={styles.title}>Check your email</H1>
      <Text style={styles.text}>
        We sent you an email with instructions on how to verify your email
        address. Click on the link in the email to get started with Workouter.
      </Text>
      <Button primary block style={styles.button} onPress={handlePressOnDone}>
        {isReloadingCurrentUser ? (
          <Spinner color="white" />
        ) : (
          <Text style={styles.buttonText}>Done</Text>
        )}
      </Button>
      <Button
        light
        block
        style={styles.button}
        onPress={handlePressOnResendEmail}
      >
        {isSendingVerification ? (
          <Spinner color="black" />
        ) : (
          <Text style={styles.buttonText}>Resend Email</Text>
        )}
      </Button>
    </Container>
  )
}

VerifyEmailScreen.navigationOptions = {
  header: null,
  gesturesEnabled: false,
}

VerifyEmailScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
}

export default VerifyEmailScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  image: {
    marginBottom: 20,
  },
  title: {
    marginBottom: 12,
  },
  text: {
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 17,
  },
  button: {
    marginBottom: 18,
    height: 70,
  },
  buttonText: {
    fontSize: 27,
  },
})
