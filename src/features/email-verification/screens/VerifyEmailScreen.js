import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Container, H1, Button, Text, Spinner } from 'native-base'
import { showSuccess, showWarning, showError } from '_utils/toast'
import ImageLogo from '_components/ImageLogo'
import { useCurrentUser } from '_hooks/use-current-user'
import { useUpdateUserMutation } from '_state/services/user'
import { User } from '_api'

const VerifyEmailScreen = () => {
  const { user, refetch } = useCurrentUser()
  const [updateUser, { isLoading }] = useUpdateUserMutation()
  const [isSigningOut, setSigningOut] = useState(false)
  const [isSendingVerification, setIsSendingVerification] = useState(false)

  const handlePressOnDone = async () => {
    try {
      const didVerify = await User.didVerify()

      if (didVerify) {
        await updateUser({ ...user, verified: true })
        refetch()
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
      await User.sendEmailVerification()
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
      await User.signOut()
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
        address. Click on the link in the email to get started with Movementt.
      </Text>
      <Button
        success
        block
        style={styles.button}
        disabled={isLoading}
        onPress={handlePressOnDone}
      >
        {isLoading ? <Spinner color="white" size="small" /> : <Text>Done</Text>}
      </Button>
      <Button
        primary
        block
        style={styles.button}
        disabled={isSendingVerification}
        onPress={handlePressOnResendEmail}
      >
        {isSendingVerification ? (
          <Spinner color="black" size="small" />
        ) : (
          <Text>Resend Email</Text>
        )}
      </Button>
      <Button
        light
        block
        style={styles.button}
        disabled={isSigningOut}
        onPress={handlePressOnCancel}
      >
        {isSigningOut ? (
          <Spinner color="black" size="small" />
        ) : (
          <Text>Cancel</Text>
        )}
      </Button>
    </Container>
  )
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
  },
})
