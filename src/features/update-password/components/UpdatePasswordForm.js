import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { Form, Item, Input, Button, Text, Icon, Spinner } from 'native-base'
import * as Yup from 'yup'
import { Formik } from 'formik'

const validationSchema = Yup.object({
  newPassword: Yup.string()
    .required()
    .min(6),
  newPasswordConfirm: Yup.string()
    .oneOf([Yup.ref('newPassword'), null])
    .required(),
})

const EmailAndPasswordForm = ({ style, isSubmitting, onSubmit }) => {
  return (
    <Formik
      initialValues={{
        newPassword: '',
        newPasswordConfirm: '',
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        touched,
        errors,
      }) => {
        return (
          <Form style={style}>
            <Item
              success={
                touched.newPassword && !errors.newPassword ? true : false
              }
              error={touched.newPassword && errors.newPassword ? true : false}
            >
              <Icon active name="md-key" />
              <Input
                autoFocus
                secureTextEntry
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="New Password"
                autoCompleteType="password"
                onChangeText={handleChange('newPassword')}
                onBlur={handleBlur('newPassword')}
                value={values.newPassword}
              />
              {touched.newPassword &&
                (errors.newPassword ? (
                  <Icon name="md-close-circle" />
                ) : (
                  <Icon name="md-checkmark-circle" />
                ))}
            </Item>

            <Item
              success={
                touched.newPasswordConfirm && !errors.newPasswordConfirm
                  ? true
                  : false
              }
              error={
                touched.newPasswordConfirm && errors.newPasswordConfirm
                  ? true
                  : false
              }
            >
              <Icon active name="md-key" />
              <Input
                secureTextEntry
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="New Password Confirm"
                autoCompleteType="password"
                onChangeText={handleChange('newPasswordConfirm')}
                onBlur={handleBlur('newPasswordConfirm')}
                value={values.newPasswordConfirm}
              />
              {touched.newPasswordConfirm &&
                (errors.newPasswordConfirm ? (
                  <Icon name="md-close-circle" />
                ) : (
                  <Icon name="md-checkmark-circle" />
                ))}
            </Item>

            <Button block primary style={styles.button} onPress={handleSubmit}>
              {isSubmitting ? (
                <Spinner color="white" />
              ) : (
                <Text style={styles.buttonText}>Update Password</Text>
              )}
            </Button>
          </Form>
        )
      }}
    </Formik>
  )
}

EmailAndPasswordForm.propTypes = {
  style: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
}

export default EmailAndPasswordForm

const styles = StyleSheet.create({
  button: {
    marginTop: 30,
    height: 70,
  },
  buttonText: {
    fontSize: 27,
  },
})
