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
      {({ handleSubmit }) => {
        return (
          <Form style={style}>
            <ImageLogo style={styles.image} />

            <Grid>
              <Col>
                <EmailField label="Email" name="email" autoFocus={true} />
              </Col>
            </Grid>

            <Grid>
              <Col>
                <PasswordField label="Password" name="password" />
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
