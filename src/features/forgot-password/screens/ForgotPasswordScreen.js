import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import {
  Container,
  Content,
  Text,
  Form,
  Item,
  Input,
  Button,
  Icon,
  Spinner,
} from 'native-base'
import { Formik } from 'formik'
import { sendPasswordResetEmail } from '../../../api/auth/password-reset'
import { showError, showSuccess } from '../../../utils/toast'
import * as Yup from 'yup'

const validationSchema = Yup.object({
  email: Yup.string()
    .email()
    .required(),
})

const ForgotPasswordScreen = ({ navigation }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = async ({ email }) => {
    setIsSubmitting(true)
    try {
      await sendPasswordResetEmail(email)
      showSuccess('Password reset email successfully sent')
    } catch (err) {
      showError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePressOnSignIn = () => {
    navigation.navigate('SignIn')
  }

  return (
    <Container>
      <Content padder>
        <Text style={styles.instructionsText}>
          Please enter your email address. You will receive a link to create a
          new password via email.
        </Text>
        <Formik
          initialValues={{ email: '' }}
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

                <Button
                  block
                  primary
                  style={styles.button}
                  onPress={handleSubmit}
                >
                  {isSubmitting ? (
                    <Spinner color="white" />
                  ) : (
                    <Text style={styles.buttonText}>Send Email</Text>
                  )}
                </Button>

                <Button
                  block
                  light
                  style={styles.button}
                  onPress={handlePressOnSignIn}
                >
                  <Text style={styles.buttonText}>Go to Sign In</Text>
                </Button>
              </Form>
            )
          }}
        </Formik>
      </Content>
    </Container>
  )
}

ForgotPasswordScreen.navigationOptions = {
  title: 'Forgot Password',
}

ForgotPasswordScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
}

export default ForgotPasswordScreen

const styles = StyleSheet.create({
  image: {
    marginBottom: 20,
  },
  instructionsText: {
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 17,
  },
  form: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    marginTop: 30,
    height: 70,
  },
  buttonText: {
    fontSize: 27,
  },
})
