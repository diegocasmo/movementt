import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { Container, Content } from 'native-base'
import EmailAndPasswordForm from '_components/EmailAndPasswordForm'
import { showError } from '_utils/toast'
import { reauthenticate } from '_state/reducers/auth'

const ReauthenticateScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const [isReAuthenticating, setIsReAuthenticating] = useState(false)

  const handleReAuthenticate = async (values, { resetForm }) => {
    setIsReAuthenticating(true)
    try {
      const action = await dispatch(reauthenticate(values))
      unwrapResult(action)
      resetForm()
      navigation.navigate('UpdatePassword')
    } catch (err) {
      showError(err.message)
    } finally {
      setIsReAuthenticating(false)
    }
  }

  return (
    <Container>
      <Content padder>
        <EmailAndPasswordForm
          style={styles.form}
          buttonText="Sign In"
          onSubmit={handleReAuthenticate}
          isSubmitting={isReAuthenticating}
        />
      </Content>
    </Container>
  )
}

ReauthenticateScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
}

export default ReauthenticateScreen

const styles = StyleSheet.create({
  form: {
    width: '100%',
    alignItems: 'center',
  },
})
