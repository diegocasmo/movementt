import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { FlatList } from 'react-native'
import { View, Text, Spinner } from 'native-base'
import WorkoutItem from './WorkoutItem'

const WorkoutList = ({ isLoading, workouts, onEndReached }) => {
  const noWorkouts = !isLoading && workouts.length === 0

  const renderFooter = () => {
    if (isLoading) return <Spinner color="black" />

    if (noWorkouts) {
      return (
        <View>
          <Text>There are no workouts to show</Text>
        </View>
      )
    }

    return null
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={workouts}
        contentContainerStyle={styles.list}
        refreshing={isLoading}
        showsVerticalScrollIndicator={false}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.3}
        keyExtractor={(workout) => `${workout.id}`}
        renderItem={({ item }) => {
          return <WorkoutItem key={item.id} workout={item} />
        }}
        ListFooterComponent={renderFooter}
      />
    </View>
  )
}

export default WorkoutList

WorkoutList.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  workouts: PropTypes.array.isRequired,
  onEndReached: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  container: {},
  list: {
    paddingBottom: 100,
  },
  btn: {
    marginTop: 10,
    marginBottom: 10,
  },
})
