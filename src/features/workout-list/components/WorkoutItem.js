import React from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { Card, CardItem, H1, Body, View, Text } from 'native-base'

const WorkoutItem = ({ workout, onPress }) => {
  return (
    <Card style={styles.container}>
      <CardItem header button style={styles.header} onPress={onPress}>
        <H1>{workout.name}</H1>
      </CardItem>
      <CardItem button onPress={onPress}>
        <Body>
          <Text numberOfLines={2} style={styles.summary}>
            {workout.exercises.map(({ name }) => name).join(', ')}
          </Text>
        </Body>
      </CardItem>
      <View style={styles.rounds}>
        <Text>Rounds: {workout.rounds}</Text>
      </View>
    </Card>
  )
}

WorkoutItem.propTypes = {
  workout: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
}

export default WorkoutItem

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: 135,
  },
  header: {
    paddingBottom: 0,
  },
  summary: {
    marginBottom: 10,
  },
  rounds: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
})
