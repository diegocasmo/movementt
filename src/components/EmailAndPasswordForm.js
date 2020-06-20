import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { Form, Grid, Col, Button, Text, Spinner } from 'native-base'
import * as Yup from 'yup'
import { Formik, getIn } from 'formik'
import ImageLogo from './ImageLogo'
import { PasswordInput, EmailInput } from './form'

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
  style,
  buttonText,
  isSubmitting,
  onSubmit,
  withPasswordConfirmation,
}) => {
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        ...(withPasswordConfirmation && { passwordConfirmation: '' }),
      }}
      validationSchema={buildValidationSchema(withPasswordConfirmation)}
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
            <ImageLogo style={styles.image} />

            <Grid>
              <Col>
                <EmailInput
                  autoFocus
                  label="Email"
                  onBlur={handleBlur('email')}
                  onChange={handleChange('email')}
                  error={getIn(errors, 'email')}
                  touched={getIn(touched, 'email')}
                  value={values.email}
                />
              </Col>
            </Grid>

            <Grid>
              <Col>
                <PasswordInput
                  label="Password"
                  onBlur={handleBlur('password')}
                  onChange={handleChange('password')}
                  error={getIn(errors, 'password')}
                  touched={getIn(touched, 'password')}
                  value={values.password}
                />
              </Col>
            </Grid>

            {withPasswordConfirmation && (
              <Grid>
                <Col>
                  <PasswordInput
                    label="Password Confirmation"
                    onBlur={handleBlur('passwordConfirmation')}
                    onChange={handleChange('passwordConfirmation')}
                    error={getIn(errors, 'passwordConfirmation')}
                    touched={getIn(touched, 'passwordConfirmation')}
                    value={values.passwordConfirmation}
                  />
                </Col>
              </Grid>
            )}

            <Button
              block
              primary
              style={styles.button}
              disabled={isSubmitting}
              onPress={handleSubmit}
            >
              {isSubmitting ? (
                <Spinner color="white" size="small" />
              ) : (
                <Text>{buttonText}</Text>
              )}
            </Button>
          </Form>
        )
      }}
    </Formik>
  )
}

EmailAndPasswordForm.defaultProps = {
  withPasswordConfirmation: false,
}

EmailAndPasswordForm.propTypes = {
  style: PropTypes.object,
  buttonText: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
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
