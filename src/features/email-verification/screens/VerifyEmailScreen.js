import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { StyleSheet } from 'react-native'
import { Container, H1, Button, Text, Spinner } from 'native-base'
import { showSuccess, showWarning, showError } from '_utils/toast'
import ImageLogo from '_components/ImageLogo'
import {
  verify,
  sendVerification,
  signOut,
} from '_state/reducers/auth'
import { User } from '_api'

const VerifyEmailScreen = () => {
  const dispatch = useDispatch()
  const [isSigningOut, setSigningOut] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [isSendingVerification, setIsSendingVerification] = useState(false)

  const handlePressOnDone = async () => {
    setIsVerifying(true)

    try {
      const action = await dispatch(verify())
      unwrapResult(action)
      if (!User.verified(action.payload)) {
        setIsVerifying(false)
        showWarning('Please, verify your email address')
      }
    } catch (err) {
      setIsVerifying(false)
      showError(err.message)
    }
  }

  const handlePressOnResend = async () => {
    setIsSendingVerification(true)
    try {
      const action = await dispatch(sendVerification())
      unwrapResult(action)
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
      const action = await dispatch(signOut())
      unwrapResult(action)
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
        disabled={isVerifying}
        onPress={handlePressOnDone}
      >
        {isVerifying ? (
          <Spinner color="white" size="small" />
        ) : (
          <Text>Done</Text>
        )}
      </Button>
      <Button
        primary
        block
        style={styles.button}
        disabled={isSendingVerification}
        onPress={handlePressOnResend}
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
