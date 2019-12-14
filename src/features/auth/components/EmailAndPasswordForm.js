import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { Form, Item, Input, Button, Text, Icon, Spinner } from 'native-base'
import * as Yup from 'yup'
import { Formik } from 'formik'
import ImageLogo from '../../../components/ImageLogo'

const validationSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email()
    .required(),
  password: Yup.string()
    .required()
    .min(6),
})

const EmailAndPasswordForm = ({ buttonText, isSubmitting, onSubmit }) => {
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
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
          <Form style={styles.form}>
            <ImageLogo style={styles.image} />
            <Item
              success={touched.email && !errors.email ? true : false}
              error={touched.email && errors.email ? true : false}
            >
              <Icon active name="mail-open" />
              <Input
                autoFocus
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="Email"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
              {touched.email &&
                (errors.email ? (
                  <Icon name="close-circle" />
                ) : (
                  <Icon name="checkmark-circle" />
                ))}
            </Item>

            <Item
              success={touched.password && !errors.password ? true : false}
              error={touched.password && errors.password ? true : false}
            >
              <Icon active name="key" />
              <Input
                secureTextEntry
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="Password"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
              {touched.password &&
                (errors.password ? (
                  <Icon name="close-circle" />
                ) : (
                  <Icon name="checkmark-circle" />
                ))}
            </Item>

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

EmailAndPasswordForm.navigationOptions = {
  buttonText: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
}

export default EmailAndPasswordForm

const styles = StyleSheet.create({
  form: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
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
