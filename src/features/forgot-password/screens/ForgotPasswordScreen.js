import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import {
  Button,
  Col,
  Container,
  Content,
  Form,
  Grid,
  Spinner,
  Text,
} from 'native-base'
import { Formik, getIn } from 'formik'
import { User } from '_api'
import { showError, showSuccess } from '_utils/toast'
import { EmailInput } from '_components/form'
import * as Yup from 'yup'
import { sendPasswordReset } from '_state/reducers/auth'

const validationSchema = Yup.object({
  email: Yup.string().email().required(),
})

const ForgotPasswordScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = async (values, { resetForm }) => {
    setIsSubmitting(true)
    try {
      const { email } = values
      const action = await dispatch(sendPasswordReset(email))
      unwrapResult(action)
      resetForm()
      showSuccess('Password reset email successfully sent')
      navigation.navigate('SignIn')
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
                <Grid>
                  <Col>
                    <EmailInput
                      autoFocus
                      style={styles.input}
                      label="Email"
                      onBlur={handleBlur('email')}
                      onChange={handleChange('email')}
                      error={getIn(errors, 'email')}
                      touched={getIn(touched, 'email')}
                      value={values.email}
                    />
                  </Col>
                </Grid>

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
                    <Text>Send Email</Text>
                  )}
                </Button>

                <Button
                  block
                  light
                  style={styles.button}
                  onPress={handlePressOnSignIn}
                >
                  <Text>Go to Sign In</Text>
                </Button>
              </Form>
            )
          }}
        </Formik>
      </Content>
    </Container>
  )
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
    marginTop: 18,
  },
})
