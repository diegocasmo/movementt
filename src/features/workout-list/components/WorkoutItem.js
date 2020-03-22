import React from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { Card, CardItem, H1, Body, View, Icon, Text } from 'native-base'

const WorkoutItem = ({ workout }) => {
  return (
    <Card>
      <CardItem header style={styles.header}>
        <H1>{workout.name}</H1>
      </CardItem>
      <CardItem>
        <Body>
          <Text numberOfLines={2} style={styles.summary}>
            {workout.exercises.map(({ name }) => name).join(', ')}
          </Text>
          <View style={styles.settingsContainer}>
            <View style={styles.settingsItem}>
              <Icon active name="md-rocket" style={styles.settingsIcon} />
              <Text>Difficulty: {workout.difficulty}</Text>
            </View>
            <View style={styles.settingsItem}>
              <Icon active name="md-refresh" style={styles.settingsIcon} />
              <Text>Rounds: {workout.rounds}</Text>
            </View>
          </View>
        </Body>
      </CardItem>
    </Card>
  )
}

WorkoutItem.propTypes = {
  workout: PropTypes.object.isRequired,
}

export default WorkoutItem

const styles = StyleSheet.create({
  header: {
    paddingBottom: 0,
  },
  summary: {
    marginBottom: 10,
  },
  settingsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '75%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  settingsItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsIcon: {
    marginRight: 10,
  },
})
