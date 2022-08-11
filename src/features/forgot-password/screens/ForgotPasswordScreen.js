import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { Col, Container, Content, Form, Grid, Text } from 'native-base'
import { Button } from '_components/ui'
import { Formik } from 'formik'
import { showError, showSuccess } from '_utils/toast'
import { EmailField } from '_components/form'
import * as Yup from 'yup'
import { useAuth } from '_context/AuthContext'

const validationSchema = Yup.object({
  email: Yup.string().email().required(),
})

const ForgotPasswordScreen = ({ navigation }) => {
  const { sendPasswordReset } = useAuth()

  const onSubmit = async (values, { resetForm }) => {
    try {
      await sendPasswordReset.mutateAsync({ bodyParams: values })
      resetForm()
      showSuccess('Password reset email successfully sent')
      navigation.navigate('SignIn')
    } catch (err) {
      showError(err)
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
          {({ handleSubmit }) => {
            return (
              <Form style={styles.form}>
                <Grid>
                  <Col>
                    <EmailField
                      label="Email"
                      name="email"
                      autoFocus={true}
                      style={styles.input}
                    />
                  </Col>
                </Grid>

                <Button
                  variant="block"
                  style={styles.button}
                  isLoading={sendPasswordReset.isLoading}
                  onPress={handleSubmit}
                >
                  Send Email
                </Button>

                <Button
                  colorScheme="light"
                  variant="block"
                  style={styles.button}
                  onPress={handlePressOnSignIn}
                >
                  Go to Sign In
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
