import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { Container, Header, Body, Title, Content } from 'native-base'
import { workouts } from '../../../seed/workouts.json'
import WorkoutItem from '../components/WorkoutItem'

const WorkoutListScreen = ({ navigation }) => {
  return (
    <Container>
      <Header>
        <Body>
          <Title>Workouts</Title>
        </Body>
      </Header>
      <Content style={styles.content} showsVerticalScrollIndicator={false}>
        {workouts.map((workout, idx) => (
          <WorkoutItem key={idx} workout={workout} navigation={navigation} />
        ))}
      </Content>
    </Container>
  )
}

export default WorkoutListScreen

WorkoutListScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
}

const styles = StyleSheet.create({
  content: {
    margin: 10,
  },
})
