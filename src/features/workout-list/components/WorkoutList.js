import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { FlatList } from 'react-native'
import { View, Text, Spinner, Button } from 'native-base'
import WorkoutItem from './WorkoutItem'

const WorkoutList = ({ fetching, onFetch, showRetry, workouts }) => {
  const noWorkouts = workouts.length === 0

  const renderFooter = () => {
    if (fetching) return <Spinner color="black" />

    if (showRetry) {
      return (
        <Button primary block style={styles.btn} onPress={onFetch}>
          <Text>Retry</Text>
        </Button>
      )
    }

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
        refreshing={fetching}
        showsVerticalScrollIndicator={false}
        onEndReached={onFetch}
        onEndReachedThreshold={0.3}
        keyExtractor={(workout) => workout.key}
        renderItem={({ item }) => {
          return <WorkoutItem key={item.index} workout={item} />
        }}
        ListFooterComponent={renderFooter}
      />
    </View>
  )
}

export default WorkoutList

WorkoutList.propTypes = {
  fetching: PropTypes.bool.isRequired,
  onFetch: PropTypes.func.isRequired,
  showRetry: PropTypes.bool.isRequired,
  workouts: PropTypes.array.isRequired,
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
