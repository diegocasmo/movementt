import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { Container, Header, Body, Title, Content } from 'native-base'
import WorkoutForm from '../components/WorkoutForm'

const WorkoutFormScreen = ({ navigation }) => {
  const handleSubmit = (attrs) => {
    console.log('handleSubmit: ', attrs)
  }

  return (
    <Container>
      <Header>
        <Body>
          <Title>Create Workout</Title>
        </Body>
      </Header>
      <Content padder showsVerticalScrollIndicator={false}>
        <WorkoutForm
          isSubmitting={false}
          onSubmit={handleSubmit}
          style={styles.form}
        />
      </Content>
    </Container>
  )
}

export default WorkoutFormScreen

WorkoutFormScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
}

const styles = StyleSheet.create({
  form: {
    width: '100%',
  },
})
