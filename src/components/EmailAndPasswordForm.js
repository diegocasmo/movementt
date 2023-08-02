import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { Form, Grid, Col } from 'native-base'
import { Button } from '_components/ui'
import * as Yup from 'yup'
import { Formik } from 'formik'
import ImageLogo from './ImageLogo'
import { PasswordField, EmailField } from './form'

const buildValidationSchema = (withPasswordConfirmation) =>
  Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().required().min(6),
    // Optionally require password confirmation
    ...(withPasswordConfirmation && {
      passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password'), null])
        .required(),
    }),
  })

const EmailAndPasswordForm = ({
  email,
  style,
  buttonText,
  isSubmitting,
  onSubmit,
  withPasswordConfirmation,
}) => {
  return (
    <Formik
      initialValues={{
        password: '',
        email,
        ...(withPasswordConfirmation && { passwordConfirmation: '' }),
      }}
      validationSchema={buildValidationSchema(withPasswordConfirmation)}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => {
        return (
          <Form style={style}>
            <ImageLogo style={styles.image} />

            <Grid>
              <Col>
                <EmailField
                  label="Email"
                  name="email"
                  autoFocus={!email}
                  disable={!!email}
                />
              </Col>
            </Grid>

            <Grid>
              <Col>
                <PasswordField
                  label="Password"
                  name="password"
                  autoFocus={!!email}
                />
              </Col>
            </Grid>

            {withPasswordConfirmation && (
              <Grid>
                <Col>
                  <PasswordField
                    label="Password Confirmation"
                    name="passwordConfirmation"
                  />
                </Col>
              </Grid>
            )}

            <Button
              variant="block"
              style={styles.button}
              isLoading={isSubmitting}
              onPress={handleSubmit}
            >
              {buttonText}
            </Button>
          </Form>
        )
      }}
    </Formik>
  )
}

EmailAndPasswordForm.defaultProps = {
  withPasswordConfirmation: false,
  email: '',
}

EmailAndPasswordForm.propTypes = {
  buttonText: PropTypes.string.isRequired,
  email: PropTypes.string,
  isSubmitting: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  style: PropTypes.object,
  withPasswordConfirmation: PropTypes.bool,
}

export default EmailAndPasswordForm

const styles = StyleSheet.create({
  image: {
    marginBottom: 25,
  },
  button: {
    marginTop: 30,
  },
})
