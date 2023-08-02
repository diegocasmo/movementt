import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { Form, Grid, Col } from 'native-base'
import { Button } from '_components/ui'
import * as Yup from 'yup'
import { PasswordField } from '_components/form'
import { Formik } from 'formik'

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
      {({ handleSubmit }) => {
        return (
          <Form style={style}>
            <Grid>
              <Col>
                <PasswordField
                  label="New Password"
                  name="newPassword"
                  style={styles.input}
                  autoFocus={true}
                />
              </Col>
            </Grid>

            <Grid>
              <Col>
                <PasswordField
                  label="Confirm New Password"
                  name="newPasswordConfirm"
                  style={styles.input}
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
