import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { Form, Item, Input, Button, Text, Icon, Spinner } from 'native-base'
import * as Yup from 'yup'
import { Formik } from 'formik'
import ImageLogo from './ImageLogo'

const buildValidationSchema = withPasswordConfirmation =>
  Yup.object({
    email: Yup.string()
      .email()
      .required(),
    password: Yup.string()
      .required()
      .min(6),
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
            <Item
              success={touched.email && !errors.email ? true : false}
              error={touched.email && errors.email ? true : false}
            >
              <Icon active name="md-mail-open" />
              <Input
                autoFocus
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="Email"
                autoCompleteType="email"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
              {touched.email &&
                (errors.email ? (
                  <Icon name="md-close-circle" />
                ) : (
                  <Icon name="md-checkmark-circle" />
                ))}
            </Item>

            <Item
              success={touched.password && !errors.password ? true : false}
              error={touched.password && errors.password ? true : false}
            >
              <Icon active name="md-key" />
              <Input
                secureTextEntry
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="Password"
                autoCompleteType="password"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
              {touched.password &&
                (errors.password ? (
                  <Icon name="md-close-circle" />
                ) : (
                  <Icon name="md-checkmark-circle" />
                ))}
            </Item>

            {withPasswordConfirmation && (
              <Item
                success={
                  touched.passwordConfirmation && !errors.passwordConfirmation
                    ? true
                    : false
                }
                error={
                  touched.passwordConfirmation && errors.passwordConfirmation
                    ? true
                    : false
                }
              >
                <Icon active name="md-key" />
                <Input
                  secureTextEntry
                  autoCorrect={false}
                  autoCapitalize="none"
                  placeholder="Password Confirmation"
                  autoCompleteType="password"
                  onChangeText={handleChange('passwordConfirmation')}
                  onBlur={handleBlur('passwordConfirmation')}
                  value={values.passwordConfirmation}
                />
                {touched.passwordConfirmation &&
                  (errors.passwordConfirmation ? (
                    <Icon name="md-close-circle" />
                  ) : (
                    <Icon name="md-checkmark-circle" />
                  ))}
              </Item>
            )}

            <Button block primary style={styles.button} onPress={handleSubmit}>
              {isSubmitting ? (
                <Spinner color="white" />
              ) : (
                <Text style={styles.buttonText}>{buttonText}</Text>
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
    height: 70,
  },
  buttonText: {
    fontSize: 27,
  },
})
