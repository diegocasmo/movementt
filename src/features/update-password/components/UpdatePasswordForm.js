import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { Form, Grid, Col } from 'native-base'
import { Button } from '_components/ui'
import * as Yup from 'yup'
import { PasswordInput } from '_components/form'
import { Formik, getIn } from 'formik'

const validationSchema = Yup.object({
  newPassword: Yup.string().required().min(6),
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
            <Grid>
              <Col>
                <PasswordInput
                  style={styles.input}
                  label="New Password"
                  onBlur={handleBlur('newPassword')}
                  onChange={handleChange('newPassword')}
                  error={getIn(errors, 'newPassword')}
                  touched={getIn(touched, 'newPassword')}
                  value={values.newPassword}
                />
              </Col>
            </Grid>

            <Grid>
              <Col>
                <PasswordInput
                  style={styles.input}
                  label="Confirm New Password"
                  onBlur={handleBlur('newPasswordConfirm')}
                  onChange={handleChange('newPasswordConfirm')}
                  error={getIn(errors, 'newPasswordConfirm')}
                  touched={getIn(touched, 'newPasswordConfirm')}
                  value={values.newPasswordConfirm}
                />
              </Col>
            </Grid>

            <Button
              variant="block"
              style={styles.button}
              isLoading={isSubmitting}
              onPress={handleSubmit}
            >
              Update Password
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
  input: {
    marginBottom: 0,
  },
  button: {
    marginTop: 30,
  },
})
