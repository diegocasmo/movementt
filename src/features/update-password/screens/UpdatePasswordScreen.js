import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { Container, Content } from 'native-base'
import UpdatePasswordForm from '../components/UpdatePasswordForm'
import { showError, showSuccess } from '_utils/toast'
import { updatePassword } from '_state/reducers/auth'

const UpdatePasswordScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false)

  const handleUpdatePassword = async ({ newPassword }) => {
    setIsUpdatingPassword(true)
    try {
      const action = await dispatch(updatePassword(newPassword))
      unwrapResult(action)
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
