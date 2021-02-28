import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { Container, Content } from 'native-base'
import EmailAndPasswordForm from '_components/EmailAndPasswordForm'
import User from '_api/user'
import { showError } from '_utils/toast'

const ReauthenticateScreen = ({ navigation }) => {
  const [isReAuthenticating, setIsReAuthenticating] = useState(false)

  const handleReAuthenticate = async (values, { resetForm }) => {
    setIsReAuthenticating(true)
    try {
      const { email, password } = values
      await User.reauthenticate(email, password)
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
