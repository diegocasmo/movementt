import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { Container, Content } from 'native-base'
import EmailAndPasswordForm from '../../../components/EmailAndPasswordForm'
import { currentUser } from '../../../api/user/current-user'
import { reauthenticate } from '../../../api/user/reauthenticate'
import { showError } from '../../../utils/toast'

const ReauthenticateScreen = ({ navigation }) => {
  const [isReAuthenticating, setIsReAuthenticating] = useState(false)

  const handleReAuthenticate = async ({ email, password }) => {
    setIsReAuthenticating(true)
    try {
      const user = currentUser()
      await reauthenticate(user, email, password)
      // TODO: Clear <UpdatePasswordForm/> values
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

ReauthenticateScreen.navigationOptions = {
  title: 'Sign In',
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
