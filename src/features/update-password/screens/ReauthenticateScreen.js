import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { Container, Content } from 'native-base'
import EmailAndPasswordForm from '_components/EmailAndPasswordForm'
import { showError } from '_utils/toast'
import { useAuth } from '_context/AuthContext'

const ReauthenticateScreen = ({ navigation }) => {
  const { reauthenticate } = useAuth()

  const handleReAuthenticate = async (values, { resetForm }) => {
    try {
      await reauthenticate.mutateAsync({ bodyParams: values })
      resetForm()
      navigation.navigate('UpdatePassword')
    } catch (err) {
      showError(err)
    }
  }

  return (
    <Container>
      <Content padder>
        <EmailAndPasswordForm
          style={styles.form}
          buttonText="Sign In"
          onSubmit={handleReAuthenticate}
          isSubmitting={reauthenticate.isLoading}
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
