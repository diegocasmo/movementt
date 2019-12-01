import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet } from 'react-native'
import {
  Container,
  Form,
  Item,
  Input,
  Button,
  Text,
  Icon,
  Spinner,
} from 'native-base'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { signIn } from '../../../state/reducers/auth'
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

const SignInScreen = () => {
  const dispatch = useDispatch()
  const { isSigningIn, hasSigningInError } = useSelector(({ auth }) => ({
    isSigningIn: auth.isSigningIn,
    hasSigningInError: auth.hasSigningInError,
  }))

  return (
    <Container style={styles.container}>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={({ email, password }) => {
          dispatch(signIn(email, password))
        }}
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

              <Button
                block
                primary
                style={styles.button}
                onPress={handleSubmit}
              >
                {isSigningIn ? (
                  <Spinner color="white" />
                ) : (
                  <Text style={styles.buttonText}>Sign In</Text>
                )}
              </Button>

              {hasSigningInError && (
                <Text>
                  Unable to sign in. Verify your email and password or create an
                  account.
                </Text>
              )}
            </Form>
          )
        }}
      </Formik>
    </Container>
  )
}

SignInScreen.navigationOptions = {
  title: 'Sign In',
}

export default SignInScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
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
