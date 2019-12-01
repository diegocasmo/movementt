import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const WorkoutListScreen = () => {
  return (
    <View style={styles.container}>
      <Text>WorkoutListScreen</Text>
    </View>
  )
}

export default WorkoutListScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
