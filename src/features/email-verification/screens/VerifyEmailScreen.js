import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet, Image } from 'react-native'
import { Container, H1, Button, Text, Spinner } from 'native-base'
import { reloadCurrentUser } from '../../../state/reducers/auth'
import { currentUser } from '../../../api/user/current-user'
import { sendEmailVerification } from '../../../api/user/send-email-verification'
import { signOut } from '../../../api/auth/sign-out'
import { showSuccess, showWarning, showError } from '../../../utils/toast'
import ImageLogo from '../../../components/ImageLogo'

const VerifyEmailScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const [isSigningOut, setSigningOut] = useState(false)
  const [isSendingVerification, setIsSendingVerification] = useState(false)
  const { isReloadingCurrentUser } = useSelector(({ auth }) => ({
    isReloadingCurrentUser: auth.isReloadingCurrentUser,
  }))

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
    setIsSendingVerification(true)
    try {
      await sendEmailVerification(currentUser())
      showSuccess('Verification email sent successfully')
    } catch (err) {
      showError(err.message)
    } finally {
      setIsSendingVerification(false)
    }
  }

  const handlePressOnCancel = async () => {
    setSigningOut(true)
    try {
      await signOut()
    } catch (err) {
      setSigningOut(false)
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
      <Button success block style={styles.button} onPress={handlePressOnDone}>
        {isReloadingCurrentUser ? (
          <Spinner color="white" />
        ) : (
          <Text style={styles.buttonText}>Done</Text>
        )}
      </Button>
      <Button
        primary
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
      <Button light block style={styles.button} onPress={handlePressOnCancel}>
        {isSigningOut ? (
          <Spinner color="black" />
        ) : (
          <Text style={styles.buttonText}>Cancel</Text>
        )}
      </Button>
    </Container>
  )
}

VerifyEmailScreen.navigationOptions = {
  headerShown: false,
  gestureEnabled: false,
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
