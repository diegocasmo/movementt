import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { Container, Content } from 'native-base'
import UpdatePasswordForm from '../components/UpdatePasswordForm'
import { showError, showSuccess } from '_utils/toast'
import { useAuth } from '_context/AuthContext'

const UpdatePasswordScreen = ({ navigation }) => {
  const { updatePassword } = useAuth()

  const handleUpdatePassword = async ({ newPassword }) => {
    try {
      await updatePassword.mutateAsync({
        bodyParams: { password: newPassword },
      })
      showSuccess('Your password has been successfully updated')
      navigation.popToTop()
    } catch (err) {
      showError(err)
    }
  }

  return (
    <Container>
      <Content padder showsVerticalScrollIndicator={false}>
        <UpdatePasswordForm
          style={styles.form}
          onSubmit={handleUpdatePassword}
          isSubmitting={updatePassword.isLoading}
        />
      </Content>
    </Container>
  )
}

UpdatePasswordScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
}

export default UpdatePasswordScreen

const styles = StyleSheet.create({
  form: {
    width: '100%',
    alignItems: 'center',
  },
})
