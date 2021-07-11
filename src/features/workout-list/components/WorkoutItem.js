import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { Body, View, Card, CardItem, Text } from 'native-base'
import { Routine } from '_api'
import Duration from '_components/time/Duration'
import { TimeAgo } from '_components/time/TimeAgo'
import { Icon } from '_components/Icon'

const WorkoutItem = ({ workout }) => {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <CardItem header style={styles.header}>
          <Text style={styles.name} numberOfLines={1}>
            {workout.name}
          </Text>
        </CardItem>
        <CardItem>
          <Body>
            <Text numberOfLines={2} style={styles.summary}>
              {Routine.getFormattedExercises(workout)}
            </Text>
            <Text style={styles.rounds}>
              Rounds: {workout.rounds_completed}/{workout.rounds}
            </Text>
          </Body>
        </CardItem>
        <View style={styles.completed_atContainer}>
          <Icon style={styles.calendarIcon} name="md-calendar-outline" />
          <TimeAgo from={workout.completed_at} />
        </View>
        <View style={styles.durationContainer}>
          <Icon style={styles.durationIcon} name="md-time-outline" />
          <Duration
            style={styles.durationText}
            elapsedMs={workout.elapsed_ms}
          />
        </View>
      </Card>
    </View>
  )
}

export default WorkoutItem

WorkoutItem.propTypes = {
  workout: PropTypes.object.isRequired,
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: 165,
    marginBottom: 5,
  },
  card: {
    height: 165,
    flex: 1,
  },
  header: {
    paddingBottom: 0,
  },
  name: {
    maxWidth: '90%',
  },
  summary: {
    marginBottom: 5,
  },
  rounds: {
    marginBottom: 5,
  },
  completed_atContainer: {
    position: 'absolute',
    bottom: 10,
    left: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  calendarIcon: {
    fontSize: 18,
    marginRight: 5,
  },
  calendarText: {},
  durationContainer: {
    position: 'absolute',
    bottom: 10,
    right: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  durationIcon: {
    fontSize: 18,
    marginRight: 5,
  },
  durationText: {
    fontSize: 16,
    fontWeight: 'normal',
  },
})
