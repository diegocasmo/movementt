import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { Container, Content } from 'native-base'
import UpdatePasswordForm from '../components/UpdatePasswordForm'
import { showError, showSuccess } from '_utils/toast'
import { updatePassword, currentUser } from '_api/user'

const UpdatePasswordScreen = ({ navigation }) => {
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false)

  const handleUpdatePassword = async ({ newPassword }) => {
    setIsUpdatingPassword(true)
    try {
      const user = currentUser()
      await updatePassword(user, newPassword)
      showSuccess('Your password has been successfully updated')
      navigation.popToTop()
    } catch (err) {
      showError(err.message)
    } finally {
      setIsUpdatingPassword(false)
    }
  }

  return (
    <Container>
      <Content padder showsVerticalScrollIndicator={false}>
        <UpdatePasswordForm
          style={styles.form}
          onSubmit={handleUpdatePassword}
          isSubmitting={isUpdatingPassword}
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
